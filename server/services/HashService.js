const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  return bcrypt.hash(password, saltRounds);
};

const verifyPasswordHash = async (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
};

module.exports = { hashPassword, verifyPasswordHash };
