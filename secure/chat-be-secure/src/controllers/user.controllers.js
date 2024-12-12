const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Wrong username or password",
        data: null,
      });
    const token = jwt.sign(
      { username: user.username, password: user.password, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
      maxAge: 1 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({ success: true, message: "Successfully logged in", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.username)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(400).json({ message: "Token required" });
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const user = await User.findById(verify.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      password: req.body.password,
    });
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneTimeLink = async (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ message: "Username required" });
  }

  // const transporter = nodemailer.createTransport({
  //   host: "smtp-relay.brevo.com", // Brevo's SMTP server
  //   port: 587, // Port for TLS
  //   secure: false, // Use TLS
  //   auth: {
  //     user: "kamal.makarim@gmail.com", // Your Brevo email address
  //     pass: process.env.SENDINBLUE_API_KEY, // Your Brevo API key
  //   },
  // });

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // const mailOptions = {
    //   from: '"kamal" <kamal.makarim@gmail.com>',
    //   to: req.body.username,
    //   subject: "Your one-time link",
    //   text: "http://localhost:5173/EditUser/" + whitelist._id,
    //   html: "<b>This is an HTML email.</b>",
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return console.log("Error:", error);
    //   }
    //   console.log("Email sent successfully:", info.response);
    // });
    console.log("One time link :localhost:5173/EditUser/" + token);
    res.status(200).json({ message: "Email sent successfully", data: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
