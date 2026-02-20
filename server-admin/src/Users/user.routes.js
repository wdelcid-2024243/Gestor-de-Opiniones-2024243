import { Router } from "express";
import { validateJWT } from "../../middlewares/validate-JWT.js";
import { checkValidators } from "../../middlewares/check-validators.js";
import { updateProfileValidators, changePasswordValidators } from "./user.validators.js";
import { me, updateProfile, changePassword } from "./user.controller.js";

const router = Router();

router.get("/me", validateJWT, me);
router.put("/me", validateJWT, updateProfileValidators, checkValidators, updateProfile);
router.put("/me/password", validateJWT, changePasswordValidators, checkValidators, changePassword);

export default router;