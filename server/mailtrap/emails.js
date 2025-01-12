import { transporter } from "./mailtrap.config.js";
import {
  getVerificationEmailTemplate,
  getResetPasswordEmailTemplate,
  getResetSuccessEmailTemplate,
} from "./mailTrapTempletes.js";
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = email;
  try {
    const mailOptions = {
      from: "alimak7976@gmail.com",
      to: recipient,
      subject: "Email Verifications",
      html: getVerificationEmailTemplate(verificationToken),
    };

    const response = transporter.sendMail(mailOptions);

    return;
  } catch (error) {
    throw new Error("Error sending veriffictions email", error);
  }
};

export const passwordResetRequestEmail = async (email, resetTokenUrl) => {
  const recipient = email;
  try {
    const mailOptions = {
      from: "alimak7976@gmail.com",
      to: recipient,
      subject: "Reset PassWord Request",
      html: getResetPasswordEmailTemplate(email, resetTokenUrl),
    };

    const response = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error sending veriffictions email", error);
  }
};

export const passwordResetSuccessEmail = async (email, name) => {
  const recipient = email;
  try {
    const mailOptions = {
      from: "alimak7976@gmail.com",
      to: recipient,
      subject: "Password Reset SuccessFully",
      html: getResetSuccessEmailTemplate(name),
    };
    const response = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error sending veriffictions email", error);
  }
};
