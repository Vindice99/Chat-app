import User from  "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../libs/utils.js";

const signup = async (req,res) => {
    const {username, email, password} = req.body;
    try {
        //Check if all fields are provided
        if(!username || !email || !password) {
            return res.status(400).json({message: "Please provide all fields"});
        }

        //hash passowrd using bcrypt
        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"});
                 //Mongodb syntax, not SQL syntax
        }        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message: "Email already exists"});
        } else {
            const salt = await bcrypt.genSalt(10);
             //hash passowrd using bcrypt
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword
            });

            if(newUser){
                //generate jwt token here
                generateToken(newUser._id,res)
                await newUser.save();
                res.status(201).json({message: "User created successfully", 
                   _id: newUser._id,
                   username: newUser.username,
                   email: newUser.email,
                   profilPicture: newUser.profilePicture,
                });
            }else{
                res.staus(400).json({message: "Invalid user data"})
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

const signin = async (req,res) => {
    const {username, password} = req.body;
     if(!username  || !password) {
            return res.status(400).json({message: "Please enter all fields"});
    }    try {
        //check if user exists
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({message: "Invalid username"});
        }
        //compare password with hashed password
        const isMattch = await bcrypt.compare(password, user.password);
        if(!isMattch) {
            return res.status(400).json({message: "Invalid password"});
        }
        //generate jwt token 
        generateToken(user._id, res);
        res.status(200).json({
            message: "User signed in successfully",
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Internal server error", error: error.message});

    }
}

const logout = (req,res) => {
    res.send("logout route")
}


export default {signup , logout, signin}