const express = require("express")
const router = express.Router()
const tvController = require("../controllers/tvController")
const { requireAuth } = require("../middlewares/authMiddleware")
router.get("/tvs/:id",tvController.tv_content)

module.exports = router