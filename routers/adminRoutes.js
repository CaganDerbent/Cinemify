const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { requireAuth, requireAdmin } = require("../middlewares/authMiddleware");


router.get("/movieadmin",requireAdmin,adminController.admin_index)
router.get("/movieadmin/addMovie",requireAdmin,adminController.admin_add)

router.post("/movieadmin/addMovie",requireAdmin,adminController.admin_add_post)

router.delete('/movieadmin/delete/:id',requireAdmin,adminController.admin_delete)

module.exports = router;