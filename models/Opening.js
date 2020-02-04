const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');
 
const OpeningSchema = new mongoose.Schema({
    ID: { type: String, unique: true },
    Title: {
        type: String,
        required: [true, '請輸入職缺標題'],
        trim: true,
        maxlength: [50, '不能大於 50 字元']
    },
    Code: String,
    Industry: {
        type: String,
        enum: [
            '飯店業',
            '工程顧問業',
            '運動器材製造業',
            '製造業上市控股集團',
            '製造業',
            '零售',
            '科技業'
        ]
    },
    FunctionID: String,
    FunctionName: String,
    Address: {
        type: String,
        required: [true, '請輸入公司地址']
    },
    Location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere' // 2dsphere 索引用來查詢球面幾何上的數據
        },
        formattedAddress: String,
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        zipcode: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        }
    },
    LocationID: String,
    LocationName: String,
    OwnerEmail: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          '請輸入合法電子信箱'
        ]
    },
    Created: {
        type: Date,
        default: Date.now
    },
    Mark: String,
    Requirement: String,
    MailList: String
}, { collection : 'opening' });
 
/**
 * Schema.pre('save', callback[next])
 **/
// 存至 db 前
OpeningSchema.pre('save', async function(next) {
    // this 為 document 本身
    const loc = await geocoder.geocode(this.Address);
 
    console.log(loc);
 
    this.Location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
      street: loc[0].streetName,
      city: loc[0].city,
      state: loc[0].stateCode,
      zipcode: loc[0].zipcode,
      country: loc[0].countryCode
    };
 
    // 地址在 query 時用不到的話，可設 undefined，不用存進 db
    this.Address = undefined;
    
    next();
  });
 
const Opening = mongoose.model('Opening', OpeningSchema);
 
module.exports = Opening;