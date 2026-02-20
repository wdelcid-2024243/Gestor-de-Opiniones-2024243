import { param, body } from "express-validator";

export const createCommentValidator = [
  param("postId")
    .notEmpty()
    .withMessage("El id de la publicación es requerido")
    .isMongoId()
    .withMessage("ID de publicación inválido"),

  body("text")
    .notEmpty()
    .withMessage("El texto del comentario es requerido")
    .isString()
    .withMessage("El texto debe ser una cadena")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("El comentario debe tener entre 1 y 500 caracteres"),
];

export const listCommentsByPostValidator = [
  param("postId")
    .notEmpty()
    .withMessage("El id de la publicación es requerido")
    .isMongoId()
    .withMessage("ID de publicación inválido"),
];

export const updateCommentValidator = [
  param("id")
    .notEmpty()
    .withMessage("El id del comentario es requerido")
    .isMongoId()
    .withMessage("ID de comentario inválido"),

  body("text")
    .notEmpty()
    .withMessage("El texto del comentario es requerido")
    .isString()
    .withMessage("El texto debe ser una cadena")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("El comentario debe tener entre 1 y 500 caracteres"),
];

export const deleteCommentValidator = [
  param("id")
    .notEmpty()
    .withMessage("El id del comentario es requerido")
    .isMongoId()
    .withMessage("ID de comentario inválido"),
];