const mongoose = require("mongoose")
const Schema = mongoose.Schema

const movieSchema = new Schema({
    embed: {
        type: String,
        required: true
    },
    bg: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    short1: {
        type: String,
        required: true,
    },
    short2: {
        type: String,
        required: true,
    },
    short3: {
        type: String,
        required: true,
    },
    exp: {
        type: String,
        required: true,
    }
})

const movie = mongoose.model("movie", movieSchema)
module.exports = movie;