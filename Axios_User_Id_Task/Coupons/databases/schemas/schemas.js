const mongoose = require('mongoose');

const couponsSchema = new mongoose.Schema({
    offerName:{
        type:String,
        required:true
    },
    couponCode:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    status:{
        type:String
    },
    userid : {
        type:String
    }
});    

const Coupon = mongoose.model('Coupon',couponsSchema);

module.exports = Coupon;