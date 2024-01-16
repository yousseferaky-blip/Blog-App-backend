const express = require("express");
const { CreateComment, UpdateComment, DeleteComment, GetPost } = require("../controller/Comment");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();


router.post("/create",verifyToken,CreateComment)
router.post("/:id",verifyToken,UpdateComment)
router.delete("/:id",verifyToken,DeleteComment)
router.get("/post/:postId",GetPost)


module.exports = router;
