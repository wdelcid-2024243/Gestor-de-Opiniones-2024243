import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

const signToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "2h";
  return jwt.sign({}, secret, { subject: String(userId), expiresIn });
};

export const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  const existing = await User.findOne({
    $or: [{ username }, { email: email.toLowerCase() }]
  });

  if (existing) {
    return res.status(409).json({ ok: false, message: "username or email already in use" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    username,
    email: email.toLowerCase(),
    passwordHash
  });

  const token = signToken(user._id);

  return res.status(201).json({
    ok: true,
    message: "Registered",
    data: {
      token,
      user: { id: user._id, name: user.name, username: user.username, email: user.email }
    }
  });
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier.toLowerCase() }, { username: identifier }]
  });

  if (!user) {
    return res.status(401).json({ ok: false, message: "Invalid credentials" });
  }

  const okPass = await bcrypt.compare(password, user.passwordHash);
  if (!okPass) {
    return res.status(401).json({ ok: false, message: "Invalid credentials" });
  }

  const token = signToken(user._id);

  return res.status(200).json({
    ok: true,
    message: "Logged in",
    data: {
      token,
      user: { id: user._id, name: user.name, username: user.username, email: user.email }
    }
  });
};