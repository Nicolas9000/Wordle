const db = require("../models");
const { decodeToken } = require("../services/JwtService");

const User = db.user;

module.exports.currentUser = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;

    const decodedToken = decodeToken(authorizationHeader);

    const user = await User.findOne({ where: { email: decodedToken.email } });

    const message = "User finded successfull";
    return res.json({ message, data: user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { username } = req.body;
    const authorizationHeader = req.headers.authorization;

    const decodedToken = decodeToken(authorizationHeader);

    const updatedUser = await User.update(
      { username },
      { where: { email: decodedToken.email } }
    );

    const message = "User updated successfull";
    return res.json({ message, data: updatedUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};
