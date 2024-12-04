const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    if (!tokenCookie) throw new Error("Unauthorized");
    const token = tokenCookie.split("=")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
