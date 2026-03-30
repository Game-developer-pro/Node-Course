const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173" }))

const productRoute = require("./routes/product.js");
const conectDB = require("./config/db.js");
const env = require("./config/env.js");
const userRoute = require("./routes/user.js");
const Product = require("./model/product.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", userRoute)

// product service
app.use("/product", productRoute);

app.get("/", (req, res) => {
  res.json("welcome to express js");
});

app.delete("/:id", (req, res) => {
  res.json("product deleted successfully")
});


conectDB();

app.listen(env.port, () => {
  console.log("Server is runing on port 4001");
});


// Assignment
// Get single product and display it on the page  