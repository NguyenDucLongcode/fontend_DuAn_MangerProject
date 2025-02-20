// validate phone number
const phoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^\d{10,11}$/; // Chỉ cho phép các số và độ dài từ 10 đến 11 ký tự
  return phoneRegex.test(phoneNumber);
};

//validate format password
const password = (password: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,50}$/;
  return regex.test(password);
};

const hookValidate = {
  phoneNumber,
  password,
};

export default hookValidate;
