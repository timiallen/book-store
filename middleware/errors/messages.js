exports.getErrorMessage = (errCode) => {
  switch (errCode) {
    case "USR-401":
      return "Unauthorized access";
    case "USR-422":
      return "User already exists";
    case "USR-404":
      return "User not found!";
    case "NOT-FOUND":
      return "Resource not found";
    case "USR-500":
      return "internal server error";
    default:
      return "An error occured!";
  }
};
