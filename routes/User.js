const express = require("express");
const {UpdateUser, DeleteUser, GetUser} = require("../controller/User");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.put("/:id",verifyToken,UpdateUser)
router.delete("/:id",verifyToken,DeleteUser)
router.get("/:id",GetUser)


module.exports = router;



