const express = require("express");
const router = express.Router();
const { auth, validateAdmin } = require("../middlewares/middlewares");
const productsController = require("../controllers/ProductController")

router.get("/", auth, productsController.getProducts)
router.get("/:id", auth, productsController.getProductById)
router.post("/", auth, validateAdmin, productsController.addProduct)
router.delete("/:id", auth, validateAdmin, productsController.deleteProductById)
router.put("/:id", auth, validateAdmin, productsController.updateProductById)

module.exports = router;
