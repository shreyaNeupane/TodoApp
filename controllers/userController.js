const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
//register
const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        sucess: false,
        message: "please provide all fields",
      });
    }
    //check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        sucess: false,
        message: "user already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    //save user
    const newUser = new userModel({
      username,
      email,
      password: hashedpassword,
    });
    await newUser.save();

    res.status(201).send({
      sucess: true,
      message: "user registered sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Register API",
      error,
    });
  }
};

//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "invalid email or password",
      });
    }
    //match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //token => Backend stores the user’s _id so that every request made by the token uniquely identifies the user.
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECERT, {
      expiresIn: "1d",
    });
    res.status(200).send({
      sucess: " true",
      message: "logged in sucessfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { registerController, loginController };
