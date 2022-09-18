const mongoose= require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:[{type:String,required:false}]
},
{
    timestamps:true,
    versionKey:false
})

userSchema.pre("save",function(next){
    //salt and rounds
    let hash= bcrypt.hashSync(this.password,2)
    this.password=hash
    
    return next()
})

userSchema.methods.checkedpassword=function(password){
    return bcrypt.compareSync(password,this.password)
}
const User = new  mongoose.model("user",userSchema)
module.exports=User;