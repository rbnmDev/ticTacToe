
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const register = async (req, res) => {
    const {email,password,confirmPassword} = req.body;
    console.log(req.body)
    try {
        if(password !== confirmPassword) {
            return res.status(400).json({message:"Passwords don't match"});
        }
        let oldUser = await User.findOne({email});
        console.log(oldUser);
        if(oldUser) {
            return res.status(400).json({message:"User already exists"});
        }
        let hashedPassword = await bcrypt.hash(password,12);
        const result = await User.create({email,password:hashedPassword});
        const token = jwt.sign({email:result.email,id:result._id},process.env.JWT_SECRET,{expiresIn:"1m"});
        res.status(200).json({email,token:token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

const login = async (req, res) => {
    const {email,password} = req.body;
    try {
        let oldUser = await User.findOne({email});
        if(!oldUser) {
            return res.status(404).json({message:"User doesn't exist"});
        }
        let isPasswordCorrect = await bcrypt.compare(password,oldUser.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({email:oldUser.email,id:oldUser._id},process.env.JWT_SECRET,{expiresIn:"10s"});
        res.status(200).json({email,token:token});
    }
    catch (error) {
    }
}

export default{
    register,
    login
}



