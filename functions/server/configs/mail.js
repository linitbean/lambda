const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const gmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.REACT_APP_EMAIL,
    pass: process.env.REACT_APP_PASS,
  },
});

const sendgridTransporter = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

const sendgridMode =
  process.env.REACT_APP_SENDGRID_MAILER &&
  process.env.REACT_APP_SENDGRID_MAILER.toLowerCase() === "true";

const transporter = sendgridMode ? sendgridTransporter : gmailTransporter;

const template = (file, context) => {
  const source = fs.readFileSync(
    path.join(__dirname, `../templates/${file}.hbs`),
    "utf8"
  );
  const hbsTemplate = handlebars.compile(source);

  return hbsTemplate(context);
};

const app_name = process.env.REACT_APP_NAME;
const app_address = process.env.REACT_APP_ADDRESS;
const support_email = sendgridMode
  ? "support@" + process.env.REACT_APP_DOMAIN
  : process.env.REACT_APP_EMAIL;
const home_url = "https://" + process.env.REACT_APP_DOMAIN;
const live_chat_url = process.env.REACT_APP_CHAT_URL;
const date = new Date().getFullYear();
const from = `${app_name} <${support_email}>`;

const mailer = async (options) => {
  if (options.inbound) {
    const { inbound, ...inboundOptions } = options;
    return transporter.sendMail(inboundOptions);
  }
  const { template: file, context: mailContext, ...restOptions } = options;

  const context = {
    app_name,
    app_address,
    support_email,
    home_url,
    live_chat_url,
    date,
    ...mailContext,
  };
  const mailOptions = { from, ...restOptions, html: template(file, context) };

  if (!sendgridMode) mailOptions.from = from;

  return transporter.sendMail(mailOptions);
};

module.exports = mailer;
