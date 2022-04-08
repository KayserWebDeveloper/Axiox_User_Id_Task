const express = require('express').Router();
const Coupon = require("../databases/schemas/schemas");
const Joi = require('joi');
const dataValidate = require("../validation/validate");
const sendEmail = require('../services/mail');
const axios = require('axios');

var currentDate = new Date(); //Today Date
var allUserDetails, currentUserId, currentId;

exports.allData = (req, res) => {
    Coupon.find({}, (err, data) => {
        if(!err){
            res.send(data);
        } else {
            console.log(err);
        }
    })
};

exports.addCoupon = async(req, res) => {
    const {endDate, offerName, couponCode, startDate} =req.body
    if(!endDate || !offerName || !couponCode || !startDate ) return res.json({message:'something is missing'})
    var currentStatus;
    var dateOne = new Date(req.body.endDate);
    if (currentDate > dateOne) {
        currentStatus = "Active";
    } else {    
        currentStatus = "Inactive";    
    }
    console.log(currentId);
    const coupon = new Coupon({
        offerName : req.body.offerName,
        couponCode : req.body.couponCode,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        status : currentStatus,
        userid : currentId
    });

    try{
        console.log(req.body);
        const result = await dataValidate.validateAsync(req.body)
        if (!result) { 
            res.status(402).json({ message: 'Invalid request', error: err });          
        } else { 
            coupon.save((err) => {
                // sendEmail(currentUserId);
            res.status(200).json({code:200, message: "Coupon added successfully!", addedCouponIs : result});
          });
        }
    } catch(error){
            res.status(402).json({code:402, message:error.message})
    }
};

exports.viewByUserId = (req, res) => {
    Coupon.findOne({userid : req.params.userid}, (err, data) => {
        if(!err){
            res.status(200).json({result:data, UserName : allUserDetails.name, UserNumber: allUserDetails.mobileNumber});
        } else {
            console.log(err);
        }
    });
}

exports.viewById = (req, res) => {
    Coupon.findById(req.params.id, (err, data) => {
        if(!err){
            res.send(data);
        } else {
            console.log(err);
        }
    });
};

exports.viewByCoupon =  (req, res) => {
    Coupon.findOne({couponCode: req.params.couponCode}, (err, data) => {
        if(!err){
            if(data.endDate > currentDate){
                Coupon.findOneAndUpdate({couponCode: req.params.couponCode}, { status:"Inactive" },{new:true}, (err, result1) => {
                    res.send(result1);
                });
            } else if(data.endDate < currentDate){
                Coupon.findOneAndUpdate({couponCode: req.params.couponCode}, { status:"Active" },{new:true}, (err, result2) => {
                    res.send(result2);
                });
            }
        } else {
            console.log(err);
        }
    })
};

exports.activeCoupons = (req, res) => {
    Coupon.find({status:"Active"}, (err, data) => {
        if(!err){
            res.send(data);
        } else {
            console.log(err);
        }
    })
};

exports.updateCoupon = (req, res) => {
    const couponToBeUpdated = {
        offerName : req.body.offerName,
        couponCode : req.body.couponCode,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        status : req.body.status
    };
    Coupon.findByIdAndUpdate(req.params.id, {$set:couponToBeUpdated}, {new:true}, (err, data) => {
        if(!err){
            res.status(200).json({code:200, message:"Coupon updated succesfully!", updatedCouponIs: data});
        } else {
            console.log(err);
        }
    });
};

exports.deleteCoupon = (req, res) => {
    Coupon.findByIdAndDelete(req.params.id, (err, data) => {
        if(!err){
            res.status(200).json({code:200, message:"Coupon deleted successfully!", deletedCouponIs:data});
        } else {
            console.log(err);
        }
    });
};

exports.userDetails = async (req, res)=> {
    try {
        let response = await axios({
            method: "GET",
            url: process.env.USER_URL,
            headers: {
                contentType: "application/json",
            }
        })
        res.status(200).json({ 
            response: response.data
        })
        allUserDetails = response.data.response.data;
        currentId = allUserDetails._id;
        console.log(allUserDetails._id);
    } 
    catch(error){
        res.status(400).json({
            message:error
        })
        console.log(error)
    }
  }