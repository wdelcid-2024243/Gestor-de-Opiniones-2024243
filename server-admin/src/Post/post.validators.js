import { body, param } from "express-validator";

export const crearPostValidators = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage("El título debe tener entre 3 y 120 caracteres"),

  body("category")
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage("La categoría debe tener entre 2 y 60 caracteres"),

  body("text")
    .trim()
    .isLength({ min: 3, max: 5000 })
    .withMessage("El texto debe tener entre 3 y 5000 caracteres"),

  body("date")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .isISO8601()
    .withMessage("La fecha debe estar en formato ISO")
];

export const actualizarPostValidators = [
  body("title").trim().isLength({ min: 3, max: 120 }),
  body("category").trim().isLength({ min: 2, max: 60 }),
  body("text").trim().isLength({ min: 3, max: 5000 }),
  body("date").isISO8601()
];

export const idPostValidator = [
  param("id").isMongoId().withMessage("ID de publicación inválido")
];