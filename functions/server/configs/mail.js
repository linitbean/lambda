const nodemailer = require("nodemailer");
// const mg = require("nodemailer-sendgrid-transport");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.REACT_APP_EMAIL,
    pass: process.env.REACT_APP_PASS,
  },
});

// const options = {
//   auth: {
//     api_user: process.env.SENDGRID_USERNAME,
//     api_key: process.env.SENDGRID_API_KEY,
//   },
// };

// const transporter = nodemailer.createTransport(mg(options));

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
// const support_email = "support@" + process.env.REACT_APP_ROOT_URL;
const support_email = process.env.REACT_APP_EMAIL;
const home_url = process.env.REACT_APP_ROOT_URL;
const live_chat_url = process.env.REACT_APP_CHAT_URL;
const date = new Date().getFullYear();
const from = `${app_name} <${support_email}>`;

const mailer = async (options) => {
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

  return transporter.sendMail(mailOptions);
};

module.exports = mailer;
