import Comment from "../Models/comment.model.js";
import Post from "../Models/post.model.js";

const buildNotFoundError = (message) => {
  const error = new Error(message);
  error.statusCode = 404;
  return error;
};

const buildForbiddenError = (message) => {
  const error = new Error(message);
  error.statusCode = 403;
  return error;
};

export const createComment = async ({ postId, text, userId }) => {
  const post = await Post.findById(postId).lean();
  if (!post) throw buildNotFoundError("Publicación no encontrada");

  const comment = await Comment.create({
    text,
    post: postId,
    author: userId,
  });

  return comment;
};

export const listCommentsByPost = async ({ postId }) => {
  const post = await Post.findById(postId).lean();
  if (!post) throw buildNotFoundError("Publicación no encontrada");

  const comments = await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate("author", "name username email")
    .lean();

  return comments;
};

export const updateComment = async ({ commentId, text, userId }) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw buildNotFoundError("Comentario no encontrado");

  if (comment.author.toString() !== userId) {
    throw buildForbiddenError("No tienes permisos para editar este comentario");
  }

  comment.text = text;
  await comment.save();

  return comment;
};

export const deleteComment = async ({ commentId, userId }) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw buildNotFoundError("Comentario no encontrado");

  if (comment.author.toString() !== userId) {
    throw buildForbiddenError("No tienes permisos para eliminar este comentario");
  }

  await Comment.deleteOne({ _id: commentId });

  return true;
};