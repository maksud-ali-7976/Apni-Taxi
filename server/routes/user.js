import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddlware.js";
const router = Router();
import {
  UserSignUpHandler,
  LoginHandler,
  VerifyEmailHandle,
  LogOutHandler,
  forgotPasswordHandler,
  ResetPasswordHandler,
  CheckAuthHandler,
} from "../controllers/user.js";
router.post("/signup", UserSignUpHandler);
router.post("/signin", LoginHandler);
router.post("/verify-email", VerifyEmailHandle);
router.post("/logOut", LogOutHandler);
router.post("/forgot-password", forgotPasswordHandler);
router.post("/reset-password/:token", ResetPasswordHandler);
router.get("/checkAuth", AuthMiddleware, CheckAuthHandler);

export default router;
