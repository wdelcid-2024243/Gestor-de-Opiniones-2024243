import app from "../configs/app.js";
import { errorHandler } from "../middlewares/handle-errors.js";

import commentRoutes from "./Comments/comment.routes.js";
import authRoutes from "./Auth/auth.routes.js";
import userRoutes from "./Users/user.routes.js";
import postRoutes from "./Post/post.routes.js";

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, message: "API OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;