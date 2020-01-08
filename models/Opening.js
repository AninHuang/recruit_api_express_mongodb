const mongoose = require('mongoose');

const OpeningSchema = new mongoose.Schema({
    ID: { type: String, unique: true },
    Title: String,
    Code: String,
    Industry: String,
    FunctionID: String,
    FunctionName: String,
    LocationID: String,
    LocationName: String,
    OwnerEmail: String,
    Created: {
        type: Date,
        default: Date.now
    },
    Mark: String,
    Requirement: String,
    MailList: String
}, { collection : 'opening' });

const Opening = mongoose.model('Opening', OpeningSchema);

module.exports = Opening;
