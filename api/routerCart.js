const express = require("express");
const router = express.Router();
const { auth, validateAdmin } = require("../middlewares/middlewares");
const cartController = require("../controllers/CartController");

router.get("/", auth, validateAdmin, cartController.getCarts)
router.get("/:id", auth, cartController.getCartById)
router.post("/", auth, cartController.addProductToCart)
router.delete("/:id", auth, validateAdmin, cartController.deleteCartById)
//router.put("/:id", auth, validateAdmin, cartController.editProductById)

module.exports = router;