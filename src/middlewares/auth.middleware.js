const jwt = require("jsonwebtoken");


const JWT_SECRET = "mysecretkey123";
function Auth(req,res,next) {
      try{
    
        const token = req.headers.authorization;
    
        if(!token){
          return res.status(401).json({message:"No token"});
        }
    
        const decoded = jwt.verify(
          token.split(" ")[1],
          JWT_SECRET
        );
    
        req.user = decoded;
    
        next();
    
      }catch(error){
        return res.status(401).json({message:"Invalid token"});
      }
    };
    //decoded.id;


module.exports = Auth;