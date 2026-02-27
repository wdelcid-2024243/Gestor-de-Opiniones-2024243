import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";

export const me = async (req, res) => {
  return res.status(200).json({ ok: true, message: "Perfil", data: req.user });
};

export const updateProfile = async (req, res) => {
  const { name, username, email } = req.body;

  if (username || email) {
    const clash = await User.findOne({
      _id: { $ne: req.user._id },
      $or: [
        ...(username ? [{ username }] : []),
        ...(email ? [{ email: email.toLowerCase() }] : [])
      ]
    });

    if (clash) {
      return res.status(409).json({ ok: false, message: "Este nombre de usuario o correo electrónico ya esta en uso" });
    }
  }

  const updated = await User.findByIdAndUpdate(
    req.user._id,
    {
      ...(name ? { name } : {}),
      ...(username ? { username } : {}),
      ...(email ? { email: email.toLowerCase() } : {})
    },
    { new: true, runValidators: true }
  ).select("-passwordHash");

  return res.status(200).json({ ok: true, message: "El perfil se actualizo correctamente", data: updated });
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  const okPass = await bcrypt.compare(currentPassword, user.passwordHash);

  if (!okPass) {
    return res.status(400).json({ ok: false, message: "La contraseña actual es incorrecta" });
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();

  return res.status(200).json({ ok: true, message: "La Contraseña se actualizo correctamente" });
};