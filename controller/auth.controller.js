const User = require('../model/authModel');
const Joi = require('joi');
const bcrypt = require('bcryptjs')


//Joi register
const registerSchema = Joi.object({
    name : Joi.string().min(6).required(),
    email : Joi.string().min(6).required().email(),
    password : Joi.string().min(6).required()
});


//Joi Login
const loginSchema = Joi.object({
    email : Joi.string().min(6).required().email(),
    password : Joi.string().min(6).required()
});


module.exports = {

    register : async (req , res) => {

        //Validation
        const { error } = registerSchema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);


        //Checking Email already exist
        const emailExist = await User.findOne({ email : req.body.email});
        if(emailExist) return res.status(400).send('Email already exist');


        //Hash passowrd
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password , salt);


        let user = new User({
    
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
            
        });
        try {
            let savedUser = await user.save();
            res.status(200).send({user : user._id});
        } catch (err) {
            res.status(400).send(err);
        }
    },

    login : async (req , res) => {
        
        //Validation
        const { error } = loginSchema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //Checking Email already exist
        const user = await User.findOne({ email : req.body.email});
        if(!user) return res.status(400).send('Email doesnt exist');
        

        const validPass = await bcrypt.compare(req.body.password , user.password);
        if(!validPass) return res.status(400).send('Incorrect Password');

        res.send('Logged In');
    },


}