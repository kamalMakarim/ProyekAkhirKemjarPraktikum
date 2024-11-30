const express = require("express");
const userRoutes = require("./src/routes/user.routes");
const postRoutes = require("./src/routes/post.routes");
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

require("./src/config/monggo.config").connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/post", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});