const db = require("../models");
const { hashPassword, verifyPasswordHash } = require("../services/HashService");
const { generateToken } = require("../services/JwtService");

const User = db.user;

module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const message = "Successful user registration";
    return res.json({ message });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    const isValidPassword = await verifyPasswordHash(
      password,
      user?.password || ""
    );

    if (!user || !isValidPassword) {
      const message = "Email or password incorrect";
      return res.status(400).json({ message });
    }
    const token = generateToken(user);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
