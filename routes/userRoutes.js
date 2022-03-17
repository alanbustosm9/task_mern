import express from "express";
import {
  register,
  auth,
  confirm,
  resetPassword,
  confirmToken,
  newPassword,
} from "../controllers/userController.js";

const router = express.Router();

// Creacion de usuario
router.post("/", register);
// Login de usuario
router.post("/login", auth);
// Confirmar token
router.get("/confirm/:token", confirm);
// Reset password
router.post("/reset-password", resetPassword);

router
  .route("/reset-password/:token")
  .get(confirmToken) // Reset password con Token
  .post(newPassword); // Recibir nueva password

export default router;
