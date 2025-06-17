import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import {connectDB} from "./libs/db.js"

// Load environment variables from .env file
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

//Middleware that allows you to extract the json data out of the request body
app.use(express.json())
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
    connectDB()
})