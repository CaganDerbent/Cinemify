const express = require("express")
const router = express.Router()
const movieController = require("../controllers/movieController")
const { requireAuth } = require("../middlewares/authMiddleware")
router.get("/movies/:id",movieController.movie_content)

module.exports = router