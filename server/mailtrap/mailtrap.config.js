import nodemailer from "nodemailer";

const Pass = process.env.GMAIL_SMTP_TOKEN;

export let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alimak7976@gmail.com",
    pass: Pass,
  },
});
