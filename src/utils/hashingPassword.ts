const bcrypt = require("bcryptjs");

export const passwordHashing = async (password: string) => {
  const salt: string = await bcrypt.genSaltSync(10);

  return bcrypt.hash(password, salt);
};
