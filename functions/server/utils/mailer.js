const mailer = require("../configs/mail");

const appUrl = process.env.REACT_APP_URL;

const welcomeMail = async (user, emailToken) => {
  const verificationLink = appUrl + "/account/verify-email/" + emailToken;

  const resp = await mailer({
    to: user.email,
    subject: "Welcome to " + process.env.REACT_APP_NAME,
    template: "welcome",
    context: {
      name: user.firstName,
      action_url: verificationLink,
    },
  });
  return resp;
};

const emailVerificationMail = async (email, emailToken) => {
  const verificationLink = appUrl + "/confirmation/verify-email/" + emailToken;

  const resp = await mailer({
    to: email,
    subject: "Verify Email Address",
    template: "verify-email",
    context: {
      action_url: verificationLink,
    },
  });
  return resp;
};

const passwordResetMail = async (user, passwordToken) => {
  const resetLink = appUrl + "/account/reset-password/" + passwordToken;

  const resp = await mailer({
    to: user.email,
    subject: "Reset Password",
    template: "reset-password",
    context: {
      name: user.firstName,
      action_url: resetLink,
    },
  });
  return resp;
};

const customMail = async ({ email, title, body, body2, body3 }) => {
  const resp = await mailer({
    to: [email, process.env.REACT_APP_EMAIL],
    subject: title,
    template: "custom",
    context: { title, body, body2, body3 },
  });
  return resp;
};

module.exports = {
  welcomeMail,
  emailVerificationMail,
  passwordResetMail,
  customMail,
};
