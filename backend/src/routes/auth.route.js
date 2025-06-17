import express from "express"
import controller from "../controllers/auth.controller.js"
const routes = express.Router()

routes.post("/signup",controller.signup)

routes.post("/signin",controller.signin)

routes.post("/logout",controller.logout)

export default routes