const capitalise = (str) => {
  if (!str) return;
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
};

const capitaliseFull = (text) => {
  if (!text) return;
  return text
    .split(" ")
    .map((word) => capitalise(word))
    .join(" ");
};

module.exports = { capitalise, capitaliseFull };
