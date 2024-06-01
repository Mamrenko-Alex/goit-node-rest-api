import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { UKRNET_EMAIL_FROM, UKRNET_EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKRNET_EMAIL_FROM,
    pass: UKRNET_EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  /* data's example
  
  {
    to: "email@gmail.com",
    subject: "Subject email",
    text: "Text email",
  } */

  return transporter.sendMail({ ...data, from: UKRNET_EMAIL_FROM });
};

export default sendEmail;
