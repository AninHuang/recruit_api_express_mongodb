const express = require('express');
const { getOpenings, getOpening, createOpening, updateOpening, deleteOpening, getOpeningsInRadius } = require('../controllers/openings');
const router = express.Router();
 
router.route('/radius/:country/:zipcode/:distance').get(getOpeningsInRadius);
 
router.route('/').get(getOpenings).post(createOpening);
 
router.route('/:id').get(getOpening).put(updateOpening).delete(deleteOpening);
 
module.exports = router;