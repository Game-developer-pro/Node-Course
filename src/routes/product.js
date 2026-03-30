const express = require("express");
const {
  addProduct,
  getProduct,
  deleteProduct,
  getSingleProduct
} = require("../controller/product");
const authenticate = require("../middleware/token");
const { checkRole } = require("../middleware/adminRole");
const { upload } = require("../middleware/multer");

const route = express.Router();

route.post("/", authenticate, checkRole, upload.single("image"), addProduct);
route.get("/", getProduct);
route.get("/:id", getSingleProduct);
route.put("/:id", authenticate, checkRole);
route.delete("/:id", authenticate, checkRole, deleteProduct);

module.exports = route;