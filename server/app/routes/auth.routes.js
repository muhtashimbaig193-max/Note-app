import express from "express"
import authenticate from "../middlewares/authenticate.js";
import { register, login, me, updateUserDetails } from "../controller/auth.controller.js";

const router = express.Router()

router.post('/register', register);
router.post('/login', login);
router.get("/me", authenticate, me);
router.patch("/edit/:userId", updateUserDetails)

export default router;