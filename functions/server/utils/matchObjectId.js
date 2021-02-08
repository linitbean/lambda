const matchObjectId = (id) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  return id.match(regex) ? true : false;
};

module.exports = matchObjectId;
