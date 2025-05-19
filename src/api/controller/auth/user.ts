import express from "express";
import { loginUser, registerUser, validateUser } from "../../services/auth";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/otp/validate", validateUser);

export default router;
