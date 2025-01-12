const userSchema = require('../models/userModel');
const bcrypt = require('bcrypt');
const joi = require('joi');

const validateUser = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required()
    });
    return schema.validate(data);
}

const createUser = async(req,res) => {
    try {
        
        const {error} = validateUser(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        else{
            const userEmail = req.body.email;
            const user = await userSchema.findOne({email: userEmail});
            if(user) return res.status(400).send('User already exists with given email');
            else{        
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);

                const newUser = await userSchema.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                });
                res.status(201).json(newUser);
            }
         }
    } catch (error) {
        res.status(500).json(error);
    }
}

const findUser = async (req,res) => {
    try{

        const userName = req.body.name;
        const user = await userSchema.findOne({name: userName});
        if(!user){
            return res.status(404).json('Username available');
        }else{
            return res.status(400).json('Username already exists');
        }

    }catch(error){
        return res.status(500).json(error.message);
    }
}


exports.createUser = createUser;
exports.findUser = findUser;