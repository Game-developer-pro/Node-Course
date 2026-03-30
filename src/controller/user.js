const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_secrect, expire_in } = require("../config/env");
const saltRound = 10;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(401).json({ message: " all field are require" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists" });
    }
    const salt = bcrypt.genSaltSync(saltRound);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };
    const createdUser = await User.create(user);

    const token = jwt.sign(
      { email: createdUser.email, id: createdUser._id, name: createdUser.name },
      jwt_secrect,
      { expiresIn: expire_in },
    );

    return res.status(201).json({ message: "account creates Successfully", token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({ message: " all field are require" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(402).json({ message: "Invalid Credential" });
    }
    console.log(user, "user");
    const comparePassword = bcrypt.compareSync(password, user.password);
    console.log("camparePassword", comparePassword);

    if (!comparePassword) {
      return res.status(402).json({ message: "Invalid Credential" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      jwt_secrect,
      { expiresIn: expire_in },
    );
    console.log(user, "userdeatils");
    console.log(token)

    return res.status(200).json({ message: "Login Successfully", token });

  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
};

module.exports = { register, login };