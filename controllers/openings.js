const Opening = require('../models/Opening');

// Middleware function

// @desc       Get all openings
// @route      GET /api/v1/openings
// @access     Public 
exports.getOpenings = async (req, res, next) => {
    //res.status(200).json({ success: true, msg: 'Show all openings' });
    try {
        const openings = await Opening.find();
        
        //res.status(200).json({ success: true, data: openings });
        res.status(200).render('openings', {
           openings: openings // 回傳給 View 的 Response 裡面，套板用
        });
    } catch (error) {
        res.status(400).json({ success: false });
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
            return res.status(400).json({ success: false });
        }

        //res.status(200).json({ success: true, data: opening });
        res.status(200).render('content', {
            opening: opening
        });
    } catch (error) {
        res.status(400).json({ success: false });
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
        res.status(400).json({ success: false });
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
            return res.status(400).json({ success: false });
        }
    
        res.status(200).json({ success: true, data: opening });
    } catch (error) {
        res.status(400).json({ success: false });
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
            return res.status(400).json({ success: false });
        }
    
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false });
    }
}
