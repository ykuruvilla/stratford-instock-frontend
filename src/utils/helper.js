const validatePhoneNumber = (phone) => {
  const isNum = /\d/;
  // to account for + and US phone numbers
  let processedStr = phone
    .replace(/\s+/g, "")
    .replace("+", "")
    .replace("(", "")
    .replace(")", "");
  return !isNum.test(processedStr);
};

export const validateInput = (
  input,
  func,
  phoneFunc = false,
  emailFunc = false
) => {
  if (!input) {
    func(true);
    return true;
  } else if (emailFunc) {
    if (!/@/.test(input)) {
      emailFunc(true);
      console.log("email wrong");
      return true;
    }
  } else if (phoneFunc) {
    if (validatePhoneNumber(input)) {
      phoneFunc(true);
      console.log("phone wrong");
      return true;
    }
  }
  func(false);
  return false;
};
