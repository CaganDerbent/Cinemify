const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jsonwebtoken
    if(token){
        jsonwebtoken.verify(token,'secret',(err,decodedToken)=>{
            if(err){
                console.log(err)
                next();
            }
            else{
                console.log("token: "+decodedToken)
                next()
            }
        })
    }
    else{
        res.redirect('/login')
        next()
    }
}
const requireAdmin = (req, res, next) => {
   
    const token = req.cookies.jsonwebtoken;
    if (!token) {
     
      return res.redirect('/login');
    }
  
   
    jsonwebtoken.verify(token, 'secret', async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.redirect('/login');
      } 
      else {
       
        try {
          const user = await User.findById(decodedToken.id);
          if (user.role === 'admin') {
           
            next();
          } 
          else {
            return res.redirect('/');
          }
        } catch (err) {
          console.log(err);
          return res.redirect('/login');
        }
      }
    });
  };

const checkUser = (req,res,next)=>{
    const token = req.cookies.jsonwebtoken

    if(token){
        jsonwebtoken.verify(token,'secret', async (err,decodedToken)=>{
            if(err){
                console.log(err)
                res.locals.user = null
            }
            else{
                console.log("decodedToken: ",decodedToken)
                  try {
                    let user = await User.findById(decodedToken.id)
                    res.locals.user= user;
                    console.log("user: " + user);
                    next();
                  } catch (err) {
                    console.log(err);
                    res.locals.user = null;
                    next();
                  }
            }
        })
    }
    else{
        res.locals.user = null
        next()
    }
}

module.exports = {requireAuth,checkUser,requireAdmin}






/*const checkUser = (req,res,next)=>{
    const token = req.cookies.jsonwebtoken

    if(token){
        jsonwebtoken.verify(token,'secret', async (err,decodedToken)=>{
            if(err){
                console.log(err)
                res.locals.user = null
            }
            else{
                console.log(decodedToken)
                  try {
                    let user = await User.findOne(decodedToken.id);
                    res.locals.user = user;
                    console.log("user: " + user);
                    next();
                  } catch (err) {
                    console.log(err);
                    res.locals.user = null;
                    next();
                  }
            }
        })
    }
    else{
        res.locals.user = null
        next()
    }
}*/