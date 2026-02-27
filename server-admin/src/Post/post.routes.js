import { Router } from "express";
import { validateJWT } from "../../middlewares/validate-JWT.js";
import { checkValidators } from "../../middlewares/check-validators.js";

import {
  crearPost,
  listarPosts,
  obtenerPostPorId,
  actualizarPost,
  eliminarPost
} from "./post.controller.js";

import {
  crearPostValidators,
  actualizarPostValidators,
  idPostValidator
} from "./post.validators.js";

const router = Router();

// Públicas
router.get("/", listarPosts);
router.get("/:id", idPostValidator, checkValidators, obtenerPostPorId);

// Protegidas
router.post("/", validateJWT, crearPostValidators, checkValidators, crearPost);
router.put("/:id", validateJWT, idPostValidator, actualizarPostValidators, checkValidators, actualizarPost);
router.delete("/:id", validateJWT, idPostValidator, checkValidators, eliminarPost);

export default router;