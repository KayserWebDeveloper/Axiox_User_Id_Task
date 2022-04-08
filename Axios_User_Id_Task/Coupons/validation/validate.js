const Joi= require("Joi");

const dataValidate = Joi.object({
    offerName : Joi.string().required(),
    couponCode : Joi.string().uppercase().required(),
    startDate : Joi.date().required(),
    endDate : Joi.date().required(),
    status : Joi.string(),
    userid : Joi.string(),
    email : Joi.string().email()
}).options({ abortEarly: false });

module.exports = dataValidate;