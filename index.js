require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose") 
const cors = require('cors')
const authRoutes = require("./routes/auth") 
const userRoute = require("./routes/User") 
const postRoute = require("./routes/Post") 
const commentRoute = require("./routes/Comment") 
const cookieParser = require('cookie-parser')
const path = require("path")

// MIDDLEWARES
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://blog-app-frontend-smoky.vercel.app'
  ],
  credentials: true,
}));
app.use(cookieParser())

app.use("/images",express.static(path.join(__dirname,"/images")))

// ROUTES
app.use("/auth",authRoutes)
app.use("/users",userRoute)
app.use("/post",postRoute)
app.use("/comment",commentRoute)

// DATABASE
mongoose.connect(process.env.MONGO__URL)
.then(() => {
    console.log("Connected to the database successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });
  
const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`Port is running in port ${port}`)
})