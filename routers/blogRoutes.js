const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController")
const app = express();



app.get('/blog/:id',blogController.blog_content)

module.exports = router;

