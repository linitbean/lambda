const createError = require("http-errors");

const matchObjectId = require("../utils/matchObjectId");

const matchId = (req, res, next) => {
  if (!matchObjectId(req.params.id))
    return next(createError.NotFound("Invalid Object ID"));
  next();
};

module.exports = matchId;
