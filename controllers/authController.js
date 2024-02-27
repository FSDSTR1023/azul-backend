const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../libs/jwt");
const jwt = require("jsonwebtoken");
const email = require("./mailController")

const register = async (req, res) => {
  const { name, lastName, email, password, role } = req.body;
  console.log(req.body, "req.body")

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      lastName,
      email,
      password: passwordHash,
      role,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    console.log("userSaved", userSaved);

    // res.cookie("token", token);
    res.json({
      id: userSaved._id,
      name: userSaved.name,
      lastName: userSaved.lastName,
      email: userSaved.email,
      role: userSaved.role,
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, "req.body")

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({ id: userFound._id });

    res.json({
      id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
      email: userFound.email,
      role: userFound.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.body;
  console.log(req.body, "req.body")
  if (!token) return res.status(400).json({ message: "Token not found" });
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (!user) return res.status(400).json({ message: "TOKEN Invalidated" });
    if (err) return res.status(400).json({ message: "Invalid token" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
      id: userFound._id,
      email: userFound.email,
      name: userFound.name,
      lastName: userFound.lastName,
      role: userFound.role,
    });
  });
};

const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

const profile = async (req, res) => {
  console.log(req.user, "req.user")
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    name: userFound.name,
    lastName: userFound.lastName,
    email: userFound.email,
    role: userFound.role,
  });
};

const updateProfile = async (req, res) => {
  console.log(req.user, "req.user")
  console.log(req.body, "req.body")
  const update = req.body;
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  try {
    const updatedDocument = await User.findByIdAndUpdate(req.user.id, update, { new: true, upsert: true });
    res.json({ message: 'Profile updated', user: updatedDocument }); 
  } catch (error) {
    res.status(500).json({ message: 'Error updating machine', error: error.message });
  }

  // return res.json({
  //   id: userFound._id,
  //   name: userFound.name,
  //   lastName: userFound.lastName,
  //   email: userFound.email,
  //   role: userFound.role,
  // });
};

async function getAllUsers(req, res) {
  User.find()
    .then((user) => {
      const users = user.map((user) => {
        return {
          id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        };
      });
      console.log("users found", user);
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err, "Something went wrong when fetching all users");
      res.status(400).json(err);
    });
}

async function getUserById(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      console.log("User found by ID: ", user);
      res.status(200).json({
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
    })
    .catch((err) => {
      console.log("User ID not found", err);
      res.status(400).json(err);
    });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const update = req.body;

  try {
    const updatedDocument = await User.findByIdAndUpdate(id, update, { new: true, upsert: true });
    res.json(updatedDocument); 
  } catch (error) {
    res.status(500).json({ message: 'Error updating machine', error: error.message });
  }
}

async function deleteUser(req, res) {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      console.log("User found by ID: ", user);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log("User ID not found", err);
      res.status(400).json(err);
    });
}

module.exports = {
  register,
  login,
  logout,
  profile,
  updateProfile,
  verifyToken,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
