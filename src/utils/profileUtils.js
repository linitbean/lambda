export const getMembership = (plan) => {
  switch (plan.slice(-1)) {
    case "1":
      return "Basic Membership";
    case "2":
      return "Silver Membership";
    case "3":
      return "Gold Membership";
    default:
      return "";
  }
};
