const UserSchema = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
    try {
    const { username, email, password } = req.body;
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const HashedPassword = await bcrypt.hashSync(password, 10);
    const NewUser = new UserSchema({
      username,
      email,
      password: HashedPassword,
    });
    await NewUser.save();
    res.status(201).json({ message: "User Created Successfully!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.Login = async (req, res) => {
    try {
      const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ message: "Email and Password are required " });
    }

    const user = await UserSchema.findOne({ email });
    if (user) {
      const MatchPassword = await bcrypt.compare(password, user.password);
      if (MatchPassword) {
        const token = jwt.sign(
          { _id: user._id, username: user.username, email: user.email },
          process.env.SECRET,
          { expiresIn: "3d" }
        );
        const { password, ...info } = user._doc; // دي عشان تظهر كل حاجه م عدا Password
        res.cookie("token", token).status(200).json({token,info});
      } else {
        return res.status(400).json({ message: "Incorrect Password Or Email" });
      }
    } else {
      return res.status(401).json({ message: "Notfound Email Or Password" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.LogOut = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.Refetch = async (req, res)=>{
  const token = req.cookies.token
  jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
      if(err){
          return res.status(404).json(err)
      }
      res.status(200).json(data)
  })
}