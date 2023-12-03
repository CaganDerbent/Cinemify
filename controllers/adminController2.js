const tv = require("../models/tv")
const admin_index2 = (req, res) => {
    tv.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render("TVadmin", { tv: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

const admin_add2 = (req, res) => {
    res.render("addTV", { title: "New" });
};

const admin_add_post2 = (req, res) => {
    console.log(req.body);
    const content = new tv(req.body);
    content.save()
        .then((result) => {
            res.redirect("/TVadmin");
        })
        .catch((err) => {
            console.log(err);
        });
};

const admin_delete2 = (req, res) => {
    const id = req.params.id;
    tv.findByIdAndDelete(id)
        .then((result) => {
            res.json({ link: '/TVadmin' });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    admin_index2,
    admin_add2,
    admin_add_post2,
    admin_delete2
};