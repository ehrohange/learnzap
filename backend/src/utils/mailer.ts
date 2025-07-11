import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendEmail(to: string, subject: string, html: string) {
  const username = process.env.GMAIL_USER;
  const password = process.env.GMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: username,
      pass: password,
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  const info = await transporter.sendMail({
    from: `LearnZap <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });

  console.log("Email sent:", info.messageId);
}
