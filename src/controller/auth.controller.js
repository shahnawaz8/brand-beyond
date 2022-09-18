
const User = require("../models/user.model")
var jwt = require('jsonwebtoken')

require('dotenv').config()

//console.log(User)

const newToken = (user)=>{
    return jwt.sign({user}, process.env.key)
}
const register = async(req,res)=>{
  try {
      let user = await User.findOne({email : req.body.email})
      if(user){
          return res.status(401).send({message:"email already exist"})
      }
      user = await User.create(req.body)
      const token = newToken(user)
      return res.status(200).send({user,token})
      
  } catch (error) {
      res.status(400).send({message:error.message})
  }
}

const login = async(req,res)=>{
    try {
        const user=  await User.findOne({email:req.body.email})
        //cehcked if mail exist or not
        if(!user){
            console.log("not exist")
            return res.status(400).send("wrong email or password ")
        }
       //check password is correct or not
       const match = user.checkedpassword(req.body.password)
       if(!match){
        console.log("wrong password exist")
           return res.status(400).send("wrong password or email")
       }
       const token = newToken(user)
       return res.status(200).send({user,token})
       console.log(user)
        
    } catch (error) {
        res.status(400).send({message:error.message})
    }
  }

  const loggedUser = async (req, res) => {
    res.send({ "user": req.user })
  }
const finduser=async(req,res)=>{
    const Allusers=await User.find().lean().exec()
   if(!Allusers){
    return res.status(400).send("not find")
   }

   return res.send(Allusers)
}

module.exports={register,login,loggedUser,finduser}