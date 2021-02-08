const createError = require("http-errors");

const permissions = (role) => (req, res, next) => {
  if (!req.user) return next(createError.Unauthorized());
  const userRole = req.user.role;
  if (!role.includes(userRole)) {
    next(createError.Forbidden("You do not have sufficient permission"));
  } else next();
};

module.exports = permissions;
