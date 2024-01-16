const express = require("express");
const {CreatePost,UpdatePost,DeletePost,GetPost,GetPosts,UserPost} = require("../controller/Post");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const multer = require("multer");

// UPLOAD IMAGE

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const fileName = `post-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType == "image") {
    cb(null, true);
  } else {
    const error = new Error("Invalid file type. Only images are allowed.");
    error.status = 400;
    return cb(error, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.post("/create", verifyToken, upload.single("photo"), CreatePost);
router.put("/:id", verifyToken, UpdatePost);
router.delete("/:id", verifyToken, DeletePost);
router.get("/:id", GetPost);
router.get("/", GetPosts);
router.get("/user/:userId", UserPost);

module.exports = router;
