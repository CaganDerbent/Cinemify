const jsonwebtoken = require("jsonwebtoken")
const maxAge = 60*60*24
const User = require("../models/users")



const createToken = (id) =>{ // jsonwebtoken doğrulama
    return jsonwebtoken.sign({id},'secret',{expiresIn:maxAge})

}

const login_get = (req,res)=>{
    res.render("login")
}
const login_post = async (req,res)=>{
    const {password , email} = req.body
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jsonwebtoken", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect("/");
    
    }
    catch(err){
        console.log(err)
        res.status(400).send(err.message)
    }
    
}
const signup_get = (req,res)=>{
    res.render("register")
}
const signup_post = (req,res)=>{
  console.log(req.body)
    const user = new User(req.body)
    user.save()
    .then((result)=>{
        res.redirect("/login")
    })
    .catch((err)=>{
        console.log(err)
    })
}


const logout_get = (req,res)=>{
  res.cookie('jsonwebtoken','',{maxAge:1})
  res.redirect('/')
}


module.exports = {
    login_get,
    login_post,
    signup_get,
    signup_post,
    logout_get
}

/*   const session = require('express-session');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

const logout_get = (req, res) => {
  // Oturumu sonlandırın ve kullanıcı oturum bilgilerini temizleyin
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      res.status(500).send('Oturum kapatılırken bir hata oluştu');
    } else {
      // Oturum başarıyla sonlandırıldıktan sonra ana sayfaya yönlendirin
      res.redirect('/');
    }
  });
};   */