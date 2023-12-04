const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

const decodeToken = (token) => {
  return jwtDecode.jwtDecode(token);
}

module.exports = { generateToken, verifyToken, decodeToken };
