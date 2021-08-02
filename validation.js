const Joi = require('joi');
const { register } = require('./controller/auth.controller');


//validation
const registerValidation = data => {
    const schema = Joi.object({
        name : Joi.string().min(6).required(),
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    });
    return schema.validate(data , schema);
}


const loginValidation = data => {
    const schema = Joi.object({
        name : Joi.string().min(6).required(),
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    });
    return schema.validate(data , schema);
}

module.exports = registerValidation;
module.exports = loginValidation;