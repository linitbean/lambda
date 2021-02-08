export const capitalise = (str) => {
  if (!str) return;
  return str[0].toUpperCase() + str.substring(1);
};

export const ccNumber = (str) =>
  [...str]
    .map((s, i) => (i % 4 === 0 ? " " + s : s))
    .join("")
    .trim();

export const replaceSnake = (str) =>
  str
    .split("-")
    .map((str) => capitalise(str))
    .join(" ");

export const convertDate = (str) => {
  const date = new Date(str);
  if (isNaN(date)) return "";
  return date.toDateString();
};
