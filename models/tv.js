const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TVSchema = new Schema({
    embed:{
        type:String,
        require:true
    },
    bg:{
        type:String,
        require:true,
    },
    title: {
        type:String,
        require:true,
    },
    short1:{
        type:String,
        require:true,
    },
    short2:{
        type:String,
        require:true,
    },
    short3:{
        type:String,
        require:true,
    },
    exp: {
        type:String,
        require:true,

    }
})
const tv = mongoose.model("tv",TVSchema)

module.exports = tv