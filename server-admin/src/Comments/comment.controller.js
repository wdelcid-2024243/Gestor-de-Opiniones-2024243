import {
  createComment,
  listCommentsByPost,
  updateComment,
  deleteComment,
} from "./comment.service.js";

export const create = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    const comment = await createComment({
      postId,
      text,
      userId: req.user.id,
    });

    return res.status(201).json({
      ok: true,
      message: "Comentario creado",
      data: comment,
    });
  } catch (error) {
    return next(error);
  }
};

export const listByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await listCommentsByPost({ postId });

    return res.status(200).json({
      ok: true,
      message: "Comentarios obtenidos",
      data: comments,
    });
  } catch (error) {
    return next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const comment = await updateComment({
      commentId: id,
      text,
      userId: req.user.id,
    });

    return res.status(200).json({
      ok: true,
      message: "Comentario actualizado",
      data: comment,
    });
  } catch (error) {
    return next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteComment({
      commentId: id,
      userId: req.user.id,
    });

    return res.status(200).json({
      ok: true,
      message: "Comentario eliminado",
    });
  } catch (error) {
    return next(error);
  }
};