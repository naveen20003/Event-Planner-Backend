const User = require('../models/users.model')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretkey123";

async function HandleCreateUser(req, res) {
    try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
      return res.status(400).json({message:"User already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const createduser = await User.create({
       username,
       email,
       password: hashedPassword
    });
    res.json({User:{
        id:createduser._id,
        username:createduser.username,
        email:createduser.email}});
    console.log(createduser)
  } catch (error) {
    console.error(error);
  };
};

async function HandleUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function HandleUserProfileUpdate(req, res) {
   try {
      const { username, email} = req.body;
      const updateprofile = await User.findByIdAndUpdate( req.user.id, { username, email }, { new: true } ).select('-password');
      if(updateprofile) {
        
      res.status(200).json({success: true, message: 'profile updated successfully', data: updateprofile})
      }
  } catch (error) {
    console.error(error)
  }
};

async function HandleUserLogin(req, res) {
   try {

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message:"Invalid credentials"});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(400).json({message:"Invalid credentials"});
    }

    const token = jwt.sign(
      {id:user._id,
       email: user.email
      },
      JWT_SECRET,
      {expiresIn:"1d"}
    );

    res.json({
      token,
      user:{
        id:user._id,
        username:user.username,
        email:user.email
      }
    });

  } catch (error) {
    console.error(error);
  }
};

module.exports = {
    HandleCreateUser,
    HandleUserProfile,
    HandleUserProfileUpdate,
    HandleUserLogin
};