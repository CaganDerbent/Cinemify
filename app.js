const express = require("express")
const mongoose = require("mongoose")
const app = express()
const movie = require("./models/movies")
const tv = require("./models/tv");
const authRoutes = require("./routers/authRoutes")
const adminRoutes = require("./routers/adminRoutes")
const adminRoutes2 = require("./routers/adminRoutes2")
const tvRoutes = require("./routers/tvRoutes")
const movieRoutes = require("./routers/movieRoutes")
const {requireAuth,checkUser, requireAdmin} = require("./middlewares/authMiddleware")
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('dotenv').config();

const apiKey = process.env.API_KEY;

const dbURL = `mongodb+srv://cagan:${apiKey}@cluster0.6gmh81j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology: true}) // mongoDB servera bağlandı
  .then((result) => {
    console.log("mongoDB Connected")
    app.listen(3005,()=> console.log("Server Running..."));
    
})


app.set('view engine','ejs')
app.use(express.static('public')) // ara katmanlar
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.get("*",checkUser)

app.get('/',(req,res)=>{
  res.render("main")
  
 })


app.get('/tvs',requireAuth,(req,res)=>{
  tv.find().sort({tv:1})
      .then((result)=>{
          res.render("tv",{tv:result})
          
      })
      .catch((err)=>{
          console.log(err)
      })
})

app.get('/movies',requireAuth,(req,res)=>{
  movie.find().sort({movies: 1})
      .then((result)=>{
          res.render("movies",{movies:result})
      })
      .catch((err)=>{
          console.log(err)
      })
})
app.get('/admin',requireAdmin,(req,res)=>{
  res.render('admin')
  res.send('This is a protected URL, only accessible to authenticated users.');
})


app.use(authRoutes)
app.use(movieRoutes)
app.use(requireAuth,adminRoutes)
app.use(requireAuth,adminRoutes2)
app.use(tvRoutes)
app.use((req,res)=>{
  res.status(404).render("404");
})