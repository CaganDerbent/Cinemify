const tv = require("../models/tv")

const tv_content = (req, res) => {
    const id = req.params.id;
    console.log(id);
  
    tv.findById(id)
      .then((result) => {
        res.render("content", { tv: result });
      })
      .catch((err) => {
        res.status(404).render("404");
      });
  };

module.exports = {
    tv_content
}