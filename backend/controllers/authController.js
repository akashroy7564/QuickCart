import User  from "../models/User.js";
import bcrypt from"bcryptjs";
import Jwt from "jsonwebtoken"

// Signin User
export const signupUser = async(req, res)=>{
    try {
        const {name,email,password,role}=req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exist"})
        }
        //Hash password
        const hashPassword= await bcrypt.hash(password, 10);

        //Create User
        await User.create({
            name,
            email,
            password:hashPassword,
            role: role || "user" // default user
        });
        res.json({message:"User registered Successfully"})

    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}
//Login-user
export const loginUser= async(req, res)=>{
    try {
        const {email , password}=req.body;

        //check User exist
        const user=await User.findOne({email});
        if (!user){
            return(res.status(400).json({message:"user not found"}))
        }


        //compare password
        const match= await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message:"invalide credential"})
        }

        const token =Jwt.sign(
            {id:user._id,  role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );
        res.json({
            message:"Login successful",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }
            
        })


    } catch (error) {
        res.status(500).json({message:"Server Error"});

    }
}

// get All user 
export const getAlluser=async (req, res) => {
    const user=await User.find();
    res.json(user)
}



