import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";

const register = async (req, res) => {
  // Evitar registro duplicado
  const { email } = req.body;
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    const error = new Error("Usuario Existente");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const user = new User(req.body);
    user.token = generateId();
    const userSaved = await user.save();

    res.json(userSaved);
  } catch (error) {
    console.log(error);
  }
};

const auth = async (req, res) => {
  const { email, password } = req.body;
  // Comprobar usuario
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  // Comprobar confirmado
  if (!user.confirm) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }
  // Confirmar password
  if (await user.confirmPassword(password)) {
    res.json({
      _id: user._uid,
      nombre: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("La contraseña es incorrecta");
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;
  const confirmUser = await User.findOne({ token });

  // Usuario que no existe
  if (!confirmUser) {
    const error = new Error("El token no existe");
    return res.status(403).json({ msg: error.message });
  }

  try {
    confirmUser.confirm = true;
    confirmUser.token = "";
    await confirmUser.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generateId();
    await user.save();
    res.json({ msg: "Hemos enviado un email con las intrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const confirmToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await User.findOne({ token });
  if (validToken) {
    res.json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error("Token no válido");
    res.status(404).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = "";
    await user.save();
    res.json({ msg: "Password modificado correctamente" });
  } else {
    const error = new Error("Token no valido");
    res.status(404).json({ msg: error.message });
  }
};

const profile = async (req, res) => {};

export {
  register,
  auth,
  confirm,
  resetPassword,
  confirmToken,
  newPassword,
  profile,
};
