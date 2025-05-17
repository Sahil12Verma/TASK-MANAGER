const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  getAllUsers,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getAllUsers);

module.exports = router;
