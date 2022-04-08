const nodemailer = require('nodemailer');
require('dotenv').config();

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
});

mailTransporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Ready to Mail');
      console.log(success);
    }
  });

function sendEmail(email){
    let details = {
        from:process.env.EMAIL,
        to: email,
        subject:"Succesful",
        text:"Your Coupon has been created successfully hureyyy!!!"
    }
    mailTransporter.sendMail(details,(err) => {
        if(err){
            console.log(err);
        } else {
            console.log("mail sent!");
        }
    });
}

module.exports = sendEmail;