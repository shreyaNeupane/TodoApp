const userModel = require("../models/userModel")
//register
const registerController = async (req,res) => {
  try{
        const {username,email,password} = req.body
        //validation
        if(!username || !email || !password){
            return res.status(500).send({
                sucess:false,
                message:'please provide all fields'
            })
        }
        //check existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({
                sucess:false,
                message:'user already exist'
            })
        }
        //save user
        const newUser = new userModel({username,email,password});
        await newUser.save();

        res.status(201).send({
            sucess : true,
            message : "user registered sucessfully"
        })
  }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Register API',
        error
    })
  }
}

//LOGIN
const loginController = async(req,res)=>{
    try{
        const{ email , password} = req.body
        //find user
         const user  = await userModel.findOne({ email , password });
         if (!user) {
           return res.status(404).send({
             sucess: false,
             message: "invalid email or password",
           });
         }
         res.status(200).send({
            sucess : " true",
            message : "logged in sucessfully",
            user

         })

    }catch(error){
        console.log(error)
    }
}
module.exports = {registerController,loginController}