require("dotenv").config();

const jwt = require("jsonwebtoken")
const verifyToken = (token)=>{
 return new Promise ((resolve,reject)=>{
    var decoded = jwt.verify(token, process.env.key ,(err,decoded)=>{
        if(err) return reject(err)
        
        return resolve(decoded)
  })
 })
}

const authenticate = async(req,res,next)=>{
    console.log(req)
      
    if(!req.headers.authorization)
        return res.status(400).send({message:"authorization token not found or incorrect"})
    
    if(!req.headers.authorization.startsWith("Bearer "))
        return res.status(400).send({message:"authorization token not found or incorrect"})
    
    const token = req.headers.authorization.trim().split(" ")[1]
    let decoded;
    try {
     decoded = await verifyToken(token) 
    } catch (error) {
        console.log(error)
        return res.status(400).send({message:"incorrect authorization"})
        
    }
   // console.log("decoded goes below")
   console.log(decoded)
    req.user=decoded.user;
    return next()
}
module.exports=authenticate;