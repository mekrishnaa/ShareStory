import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.js';


// method for signin user
export const signin = async(req,res)=>{
    const {email,password} = req.body;  // extracting email and password from request
    try {
        const existingUser = await User.findOne({email});   // checking for the user in the database

        if(!existingUser) return res.status(404).json({message:'User Not Found'});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password); // comparing the password given by user and stored in the database

        if(!isPasswordCorrect) return res.status(400).json({message:"Incorrect Password"});

        const token = jwt.sign({email:existingUser.email, id: existingUser._id}, 'test' /* it is a secret text which only developer team know */, /* options Object */ {expiresIn:"1h"});  // creating token for user

        res.status(200).json({result:existingUser, token });

    } catch (error) {
        
        res.status(500).json({message:"something went wrong"});

    }
}

// Signup method
export const signup = async(req,res)=>{

    const {email, password, confirmPassword, firstName, lastName} = req.body;   //extracting data from request

    try {
        const existingUser = await User.findOne({email});   //checking for user in database

        if(existingUser) return res.status(400).json({message:'User already exists'});

        if(password !== confirmPassword) return res.status(400).json({message:'Password Dose not match'});  // matching password and confirm password field

        const encryptedPassword =  await bcrypt.hash(password,12 /* Slat layer */);  // encrypting the password.

        const result = await User.create({email,password:encryptedPassword,name:`${firstName} ${lastName}`});   //creating user 

        const token = jwt.sign({email:result.email, id: result._id}, 'test' /* it is a secret text which only developer team know */, /* options Object */ {expiresIn:"1h"});   // creating token for user

        res.status(200).json({result:result, token });


    } catch (error) {
        
        res.status(500).json({message:"something went wrong"});


    }

}