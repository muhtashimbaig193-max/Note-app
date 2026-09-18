import express from "express"
import authenticate from "../middlewares/authenticate.js";
import { register, login, me } from "../controller/auth.controller.js";

const router = express.Router()

router.post('/register', register);
router.post('/login', login);
router.get("/me", authenticate, me);

export default router;