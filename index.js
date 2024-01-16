require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoute = require("./routes/User");
const postRoute = require("./routes/Post");
const commentRoute = require("./routes/Comment");
const cookieParser = require("cookie-parser");
const path = require("path");

// MIDDLEWARES
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://blog-app-frontend-smoky.vercel.app'
  ],
  credentials: true,
}));
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "/images")));

// CORS HEADERS
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://blog-app-frontend-smoky.vercel.app'
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    console.log('CORS preflight request');
    res.sendStatus(200);
  } else {
    next();
  }
});

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);

// DATABASE
mongoose.connect(process.env.MONGO__URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Port is running on port ${port}`);
});
