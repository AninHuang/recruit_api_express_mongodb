// Middleware function

// @desc       Get all openings
// @route      GET /api/v1/openings
// @access     Public 
exports.getOpenings = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all openings' });
}

// @desc       Get single opening
// @route      GET /api/v1/openings/:id
// @access     Public 
exports.getOpening = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Get opening ${req.params.id}` });
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