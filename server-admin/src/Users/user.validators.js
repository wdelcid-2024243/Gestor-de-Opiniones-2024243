import { body } from "express-validator";

export const updateProfileValidators = [
  body("name").optional().trim().isLength({ min: 2, max: 60 }).withMessage("name 2-60"),
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 }).withMessage("username 3-30")
    .matches(/^[a-zA-Z0-9._-]+$/).withMessage("username invalid"),
  body("email").optional().trim().isEmail().withMessage("email invalid")
];

export const changePasswordValidators = [
  body("currentPassword").notEmpty().withMessage("currentPassword required"),
  body("newPassword").isLength({ min: 6, max: 100 }).withMessage("newPassword min 6")
];