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
            res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: opening });
    } catch (error) {
        res.status(400).json({ success: false });
    }
}

// @desc       Create new opening
// @route      POST /api/v1/openings
// @access     Private 
exports.createOpening = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Create new opening' });
}

// @desc       Update opening
// @route      PUT /api/v1/openings/:id
// @access     Private 
exports.updateOpening = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update opening ${req.params.id}` });
}

// @desc       Delete opening
// @route      DELETE /api/v1/openings/:id
// @access     Private 
exports.deleteOpening = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete opening ${req.params.id}` });
}