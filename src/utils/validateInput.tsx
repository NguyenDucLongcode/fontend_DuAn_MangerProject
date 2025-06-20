import { PasswordStrengthRegex } from "@/utils/regex";

export const validatePassword = (password: string) => {
  if (!PasswordStrengthRegex.test(password)) {
    return false; // nếu ko đủ mạnh
  }
  return true;
};

export const isValidEmail = (email: string): boolean => {
  const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EmailRegex.test(email);
};
