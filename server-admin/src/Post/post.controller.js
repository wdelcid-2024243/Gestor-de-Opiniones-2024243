import {
  crearPostService,
  listarPostsService,
  obtenerPostPorIdService,
  actualizarPostService,
  eliminarPostService
} from "./post.service.js";

export const crearPost = async (req, res, next) => {
  try {
    const post = await crearPostService(req.body, req);
    res.status(201).json({ ok: true, mensaje: "Publicación creada", data: post });
  } catch (error) {
    next(error);
  }
};

export const listarPosts = async (_req, res, next) => {
  try {
    const posts = await listarPostsService();
    res.status(200).json({ ok: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const obtenerPostPorId = async (req, res, next) => {
  try {
    const post = await obtenerPostPorIdService(req.params.id);
    if (!post) {
      return res.status(404).json({ ok: false, mensaje: "Publicación no encontrada" });
    }
    res.status(200).json({ ok: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const actualizarPost = async (req, res, next) => {
  try {
    const post = await actualizarPostService(req.params.id, req.body, req);
    res.status(200).json({ ok: true, mensaje: "Publicación actualizada", data: post });
  } catch (error) {
    next(error);
  }
};

export const eliminarPost = async (req, res, next) => {
  try {
    await eliminarPostService(req.params.id, req);
    res.status(200).json({ ok: true, mensaje: "Publicación eliminada" });
  } catch (error) {
    next(error);
  }
};