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
      return true;
    }
  } else if (phoneFunc) {
    if (validatePhoneNumber(input)) {
      phoneFunc(true);
      return true;
    }
  }
  func(false);
  return false;
};

export const filterWarehouse = (obj, str) => {
  if (str === "") {
    return obj;
  }

  if (obj.name.toLowerCase().includes(str.toLowerCase())) {
    return obj;
  }

  if (obj.address.toLowerCase().includes(str.toLowerCase())) {
    return obj;
  }

  if (obj.city.toLowerCase().includes(str.toLowerCase())) {
    return obj;
  }

  if (obj.country.toLowerCase().includes(str.toLowerCase())) {
    return obj;
  }

  if (obj.contact.name.toLowerCase().includes(str.toLowerCase())) {
    return obj;
  }

  if (obj.contact.phone.toLowerCase().includes(str.toLowerCase())) {
    return obj;
  }

  if (obj.contact.email.toLowerCase().includes(str.toLowerCase())) {
    return obj;
  }
};

export const filterInventory = (obj, str) => {
  if (str === "") {
    return obj;
  }
  if (obj.warehouseName.toLowerCase().includes(str.toLowerCase())) {
    return obj;
  }

  if (obj.itemName.toLowerCase().includes(str.toLowerCase())) {
    return obj;
  }

  if (obj.category.toLowerCase().includes(str.toLowerCase())) {
    return obj;
  }

  if (obj.status.toLowerCase().includes(str.toLowerCase())) {
    return obj;
  }

  if (obj.quantity.toString().toLowerCase().includes(str.toLowerCase())) {
    return obj;
  }
};
