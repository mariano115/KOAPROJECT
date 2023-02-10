const Router = require('koa-router')
const { auth, validateAdmin } = require("../middlewares/middlewares");
const productsController = require("../controllers/ProductController")

const router = new Router({
    prefix: '/productos',
  })

router.get("/", auth, productsController.getProducts)
router.get("/:id", auth, productsController.getProductById)
router.post("/", auth, validateAdmin, productsController.addProduct)
router.delete("/:id", auth, validateAdmin, productsController.deleteProductById)
router.put("/:id", auth, validateAdmin, productsController.updateProductById)

const routerProduct = router.routes()

module.exports = { routerProduct };