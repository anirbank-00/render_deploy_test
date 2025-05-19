import express from "express";
import {
  loginProvider,
  registerProvider,
  validateProvider,
} from "../../services/auth";

const router = express.Router();

router.post("/login", loginProvider);
router.post("/register", registerProvider);
router.post("/otp/validate", validateProvider);

export default router;
