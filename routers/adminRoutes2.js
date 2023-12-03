const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController2");
const { requireAuth, requireAdmin } = require("../middlewares/authMiddleware");


router.get("/TVadmin",requireAdmin,adminController.admin_index2)
router.get("/TVadmin/addTV",requireAdmin,adminController.admin_add2)

router.post("/TVadmin/addTV",requireAdmin,adminController.admin_add_post2)

router.delete('/TVadmin/delete/:id',requireAdmin,adminController.admin_delete2)

module.exports = router;