import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidators, loginValidators } from "./auth.validators.js";
import { checkValidators } from "../../middlewares/check-validators.js";

const router = Router();

router.post("/register", registerValidators, checkValidators, register);
router.post("/login", loginValidators, checkValidators, login);

export default router;