const bcrypt = require('bcrypt');

const hashPassword = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;

  return data;
};

module.exports = hashPassword;
