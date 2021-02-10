const JWT = require("jsonwebtoken");
const createError = require("http-errors");

// const client = require("../configs/redis");

const signAccessToken = (userId, key) => {
  return new Promise((resolve, reject) => {
    const payload = { key };
    const secret = process.env.ACCESS_SECRET;
    const options = {
      audience: userId,
      expiresIn: "20m",
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        // console.log(err.message);
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

const signRefreshToken = (userId, key) => {
  return new Promise((resolve, reject) => {
    const payload = { key };
    const secret = process.env.REFRESH_SECRET;
    const options = {
      audience: userId,
      expiresIn: "30d",
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        // console.log(err.message);
        reject(createError.InternalServerError());
      }

      // // save refresh token to redis database
      // client.SET(userId, token, "EX", 30 * 24 * 60 * 60, (err, reply) => {
      //   if (err) {
      //     console.log(err.message);
      //     reject(createError.InternalServerError());
      //   }
      //   resolve(token);
      // });

      // simply
      resolve(token);
    });
  });
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    // verify refresh token and return user id and hashed password or reject
    JWT.verify(refreshToken, process.env.REFRESH_SECRET, (err, payload) => {
      if (err) return reject(createError.Unauthorized());

      const userId = payload.aud;
      const key = payload.key;

      // // check redis database for userid key
      // client.get(userId, (err, result) => {
      //   if (err) {
      //     console.log(err.message);
      //     return reject(createError.InternalServerError());
      //   }
      //   console.log({ refreshToken, result });
      //   // check if refresh token is the current token in the redis database
      //   if (refreshToken === result) return resolve(userId);
      //   return reject(createError.Unauthorized());
      // });

      // simply
      resolve({ userId, key });
    });
  });
};

const signEmailToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.EMAIL_SECRET;
    const options = {
      audience: userId,
      expiresIn: "365d", // important
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

const verifyEmailToken = (emailToken) => {
  return new Promise((resolve, reject) => {
    // verify refresh token and return user id or reject
    JWT.verify(emailToken, process.env.EMAIL_SECRET, (err, payload) => {
      if (err) {
        // return jwt error message only if token might be expired. ie return null if jwt is invalid
        const message = err.name === "JsonWebTokenError" ? null : err.message;
        return reject(createError.Unauthorized(message));
      }

      const userId = payload.aud;

      resolve({ userId });
    });
  });
};

const signPasswordResetToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.PASSWORD_SECRET;
    const options = {
      audience: userId,
      expiresIn: "20m", // important
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        // console.log(err.message);
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

const verifyPasswordResetToken = (passwordResetToken) => {
  return new Promise((resolve, reject) => {
    // verify refresh token and return user id or reject
    JWT.verify(
      passwordResetToken,
      process.env.PASSWORD_SECRET,
      (err, payload) => {
        if (err) {
          // console.log(err.message, passwordResetToken);
          // return jwt error message only if token might be expired. ie return null if jwt is invalid
          const message = err.name === "JsonWebTokenError" ? null : err.message;
          return reject(createError.Unauthorized(message));
        }

        const userId = payload.aud;

        resolve({ userId });
      }
    );
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  signEmailToken,
  verifyEmailToken,
  verifyRefreshToken,
  signPasswordResetToken,
  verifyPasswordResetToken,
};
