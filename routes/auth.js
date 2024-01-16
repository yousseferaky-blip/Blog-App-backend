const express = require("express");
const { Register, Login, LogOut, Refetch } = require("../controller/auth");
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", LogOut);
router.get("/refetch", Refetch);

module.exports = router;
