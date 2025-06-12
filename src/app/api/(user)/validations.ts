export const validatePassword = (password: string) => {
  try {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordPattern.test(password);
  } catch (error) {
    console.error("Password validation error:", error);
    return false;
  }
};
