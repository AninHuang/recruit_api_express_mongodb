const mongoose = require('mongoose');

const OpeningSchema = new mongoose.Schema({
    ID: String,
    Title: String,
    Code: String,
    Industry: String,
    FunctionID: String,
    FunctionName: String,
    LocationID: String,
    LocationName: String,
    OwnerEmail: String,
    Created: String,
    Mark: String,
    Requirement: String,
    MailList: String
}, { collection : 'opening' });

const Opening = mongoose.model('Opening', OpeningSchema);

module.exports = Opening;