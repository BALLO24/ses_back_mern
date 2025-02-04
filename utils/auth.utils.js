const jwt=require("jsonwebtoken")
const createToken=function(id){
    return jwt.sign({id},process.env.TOKEN_SECRET,{
        expiresIn:3*24*3600*1000
    })
}

module.exports={createToken}