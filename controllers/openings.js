const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const Opening = require('../models/Opening');
 
// Middleware function
 
// @desc       Get all openings
// @route      GET /api/v1/openings
// @access     Public 
exports.getOpenings = async (req, res, next) => {
    //res.status(200).json({ success: true, msg: 'Show all openings' });
    try {
        // 假設模擬 /api/v1/openings?StartingSalary[lte]=30000&select=Title,LocationName&sort=-Industry&limit=2
        
        let query;

        // Object Spread
        // { ...obj } is similar to Object.assign()
        // Copy req.query
        const reqQuery = { ...req.query };

        // 先排除以下關鍵字，撈全部資料
        // 不然以下關鍵字會當成 DB Document 的 Field 被尋找 
        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];

        // Loop over removeFields and delete them from reqQuery
        removeFields.forEach(field => delete reqQuery[field]);

        let queryStr = JSON.stringify(reqQuery);

        // Handling req.query { StartingSalary: { lte: '30000' } }
        // Make it like $gt, $gte, etc => Add money($) sign => { StartingSalary: { $lte: '30000' } }
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        
        query = Opening.find(JSON.parse(queryStr));

        // If including select, then handle it
        if (req.query.select) { // Title,LocationName
            const fields = req.query.select.split(',').join(' ');

            /**
             * Mongoose
             * Query.prototype.select()
             * 
             * selecting the `name` and `occupation` fields
             * query.select('name occupation');
             */
            query = query.select(fields);
        }

        // If including sort, then handle it
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');

            /**
             * Mongoose
             * Query.prototype.sort()
             * 
             * sort by "field" ascending and "test" descending
             * query.sort({ field: 'asc', test: -1 });
             * 
             * equivalent
             * query.sort('field -test');
             */
            query = query.sort(sortBy);
        } else {
            query = query.sort('-Created'); // Descending
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1; // Page 1 is default
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Opening.countDocuments();

        /**
         * Mongoose
         * Query.prototype.skip()
         * 
         * Specifies the number of documents to skip.
         */
        query = query.skip(startIndex).limit(limit);

        // Exercuting query
        const openings = await query;

        // Create pagination
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }
        
        //res.status(200).json({ success: true, data: openings });
        res.status(200).render('openings', {
           openings, // 回傳給 View 的 Response 裡面，套板用
           pagination
        });
    } catch (error) {
        next(error);
    }
}
 
// @desc       Get single opening
// @route      GET /api/v1/openings/:id
// @access     Public 
exports.getOpening = async (req, res, next) => {
    //res.status(200).json({ success: true, msg: `Get opening ${req.params.id}` });
    try {
        //const opening = await Opening.findById(req.params.id); // 固定找 _id
        const opening = await Opening.findOne({ ID: req.params.id });
        
        if (!opening) {
            //return res.status(400).json({ success: false });
            return next(
                new ErrorResponse(`Opening not found with id of ${req.params.id}`, 404)
            );
        }
 
        //res.status(200).json({ success: true, data: opening });
        res.status(200).render('content', {
            opening: opening
        });
    } catch (error) {
        //res.status(400).json({ success: false });
        next(error);
    }
}
 
// @desc       Create new opening
// @route      POST /api/v1/openings
// @access     Private 
exports.createOpening = async (req, res, next) => {
    try {
        const newOpening = await Opening.create(req.body);
 
        res.status(201).json({ success: true, data: newOpening });
    } catch (error) {
        next(error);
    }
}
 
// @desc       Update opening
// @route      PUT /api/v1/openings/:id
// @access     Private 
exports.updateOpening = async (req, res, next) => {
    try {
        const opening = await Opening.findOneAndUpdate({ ID: req.params.id }, req.body, {
            new: true,
            runValidators: true //執行 Validation 驗證
        });
    
        if (!opening) {
            return next(
                new ErrorResponse(`Opening not found with id of ${req.params.id}`, 404)
            );
        }
    
        res.status(200).json({ success: true, data: opening });
    } catch (error) {
        next(error);
    }
}
 
// @desc       Delete opening
// @route      DELETE /api/v1/openings/:id
// @access     Private 
exports.deleteOpening = async (req, res, next) => {
    //res.status(200).json({ success: true, msg: `Delete opening ${req.params.id}` });
    try {
        const opening = await Opening.findOneAndDelete({ ID: req.params.id });
    
        if (!opening) {
            return next(
                new ErrorResponse(`Opening not found with id of ${req.params.id}`, 404)
            );
        }
    
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
}
 
// @desc      Get openings within a radius
// @route     GET /api/v1/openings/radius/:country/:zipcode/:distance
// @access    Private
exports.getOpeningsInRadius = async (req, res, next) => {
    const { country, zipcode, distance } = req.params;
  
    console.log(country, zipcode, distance);
 
    // Get lat/lng from geocoder
    const loc = await geocoder.geocode({ countryCode: country, zipcode: zipcode });
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
  
    console.log(loc);
 
    // 使用弧度計算半徑
    // 將距離除以地球半徑
    const radius = distance / 3963.2;
  
    const openings = await Opening.find({
      // 使用球面幾何的地理空間查詢定義的圓。回傳圓圈範圍內的 document
      Location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });
  
    res.status(200).json({
      success: true,
      count: openings.length,
      data: openings
    });
  }