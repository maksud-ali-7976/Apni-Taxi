import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
  sendVerificationEmail,
  passwordResetRequestEmail,
  passwordResetSuccessEmail,
} from "../mailtrap/emails.js";
import { generateTokenAndSetCookie } from "../utils/genreteTokenAndCookie.js";

export async function UserSignUpHandler(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name && !email && !password && !confirmPassword) {
      return res
        .status(402)
        .json({ success: false, message: "All Field Required" });
    }
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: `Password does'nt Matching`,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User Already Exits" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const VerificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const newUser = new User({
      name,
      email,
      password: hashedPass,
      VerificationToken: VerificationToken,
      VerificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000, //24 houres
    });
    await newUser.save();

    sendVerificationEmail(newUser.email, VerificationToken);
    return res.status(200).json({
      message: "Account Created Successfully",
      user: { ...newUser._doc, password: undefined },
    });
  } catch (error) {
    return;
  }
}

export async function VerifyEmailHandle(req, res) {
  const { otp } = req.body;
  try {
    const user = await User.findOne({
      VerificationToken: otp,
      VerificationTokenExpiredAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "InValid OTP Or Expire Otp" });
    }

    user.isVerified = true;
    user.VerificationToken = undefined;
    user.VerificationTokenExpiredAt = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
      user: user,
    });
  } catch (error) {}
}

export async function LoginHandler(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.json({ success: false, message: "InValid Credentials" });
    }

    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Login Successfully", user: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function LogOutHandler(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/", // Ensure path matches the path used during cookie creation
  });
  return res
    .status(200)
    .json({ success: true, message: "User LogOut Successfully" });
}

export async function forgotPasswordHandler(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    // resetToken
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiredAt = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiredAt = resetTokenExpiredAt;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Reset Password Link Send in Your email",
      token: resetToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function ResetPasswordHandler(req, res) {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
    });
    if (!user) {
      return res
        .status(402)
        .json({ success: false, message: "InValid Or Expired Token" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiredAt = undefined;

    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password Reset SuccessFully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function CheckAuthHandler(req, res) {
  const userId = req.userId;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "UnAuthorized Access" });
    }

    return res.status(200).json({ success: true, user: user });
  } catch (error) {}
}
