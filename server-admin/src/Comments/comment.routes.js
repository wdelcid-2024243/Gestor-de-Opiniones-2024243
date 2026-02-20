import { Router } from "express";
import { validateJWT } from "../../middlewares/validate-JWT.js";
import { checkValidators } from "../../middlewares/check-validators.js";

import {
  createCommentValidator,
  listCommentsByPostValidator,
  updateCommentValidator,
  deleteCommentValidator,
} from "./comment.validators.js";

import { create, listByPost, update, remove } from "./comment.controller.js";

const router = Router();

// Crear comentario en una publicación
router.post(
  "/:postId",
  validateJWT,
  createCommentValidator,
  checkValidators,
  create
);

// Listar comentarios de una publicación
router.get(
  "/:postId",
  validateJWT,
  listCommentsByPostValidator,
  checkValidators,
  listByPost
);

// Editar comentario (solo autor)
router.put(
  "/:id",
  validateJWT,
  updateCommentValidator,
  checkValidators,
  update
);

// Eliminar comentario (solo autor)
router.delete(
  "/:id",
  validateJWT,
  deleteCommentValidator,
  checkValidators,
  remove
);

export default router;