import { body } from "express-validator";

export const registerValidators = [
  body("name").trim().isLength({ min: 2, max: 60 }).withMessage("name 2-60"),
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 }).withMessage("username 3-30")
    .matches(/^[a-zA-Z0-9._-]+$/).withMessage("username invalid"),
  body("email").trim().isEmail().withMessage("email invalid"),
  body("password").isLength({ min: 6, max: 100 }).withMessage("password min 6")
];

export const loginValidators = [
  body("identifier").trim().notEmpty().withMessage("identifier required"),
  body("password").notEmpty().withMessage("password required")
];