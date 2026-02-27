import Post from "../Models/post.model.js";

const obtenerIdUsuario = (req) => req.user._id;

export const crearPostService = async (body, req) => {
  const post = await Post.create({
    title: body.title,
    category: body.category,
    text: body.text,
    date: new Date(body.date),
    author: obtenerIdUsuario(req)
  });

  return post;
};

export const listarPostsService = async () => {
  return Post.find()
    .populate("author", "username email")
    .sort({ createdAt: -1 });
};

export const obtenerPostPorIdService = async (id) => {
  return Post.findById(id).populate("author", "username email");
};

export const actualizarPostService = async (id, body, req) => {
  const post = await Post.findById(id);
  if (!post) {
    const error = new Error("Publicación no encontrada");
    error.statusCode = 404;
    throw error;
  }

  if (String(post.author) !== String(obtenerIdUsuario(req))) {
    const error = new Error("No autorizado: solo el autor puede editar");
    error.statusCode = 403;
    throw error;
  }

  post.title = body.title;
  post.category = body.category;
  post.text = body.text;
  post.date = new Date(body.date);

  await post.save();
  return post;
};

export const eliminarPostService = async (id, req) => {
  const post = await Post.findById(id);
  if (!post) {
    const error = new Error("Publicación no encontrada");
    error.statusCode = 404;
    throw error;
  }

  if (String(post.author) !== String(obtenerIdUsuario(req))) {
    const error = new Error("No autorizado: solo el autor puede eliminar");
    error.statusCode = 403;
    throw error;
  }

  await post.deleteOne();
  return true;
};