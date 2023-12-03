const { response } = require("express")
const { requireAuth } = require("../middlewares/authMiddleware")
const movie = require("../models/movies")


const admin_index = (req,res)=>{
   movie.find().sort({createdAt: -1})
        .then((result)=>{
            res.render("movieadmin",{movies:result})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

const admin_add = (requireAuth,(req,res)=>{
    res.render("addMovie",{title:"New"})
})
const admin_add_post = (req,res)=>{
    console.log(req.body)
    const content = new movie(req.body)
    content.save()
    .then((result)=>{
        res.redirect("/movieadmin")
    })
    .catch((err)=>{
        console.log(err)
    })
}

const admin_delete = (req,res)=>{ // delete method adminde fetch kodu var
    const id = req.params.id;
    movie.findByIdAndDelete(id)
    .then((result)=>{
        res.json({link:'/movieadmin'})

    })
    .catch((err)=>{
        console.log(err)
    })
}

    

    

module.exports = {
    admin_index,
    admin_add,
    admin_add_post,
    admin_delete,
}