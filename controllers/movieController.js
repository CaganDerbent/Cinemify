const movie = require("../models/movies")

const movie_content = (req,res) => {
    const id = req.params.id
    console.log(id)

    movie.findById(id)
    .then((result)=>{
        res.render("contentm",{movies:result})
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = {
    movie_content
}
