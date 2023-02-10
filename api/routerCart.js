const Router = require('koa-router')
const { auth, validateAdmin } = require("../middlewares/middlewares");
const cartController = require("../controllers/CartController");

const router = new Router({
    prefix: '/carrito',
  })

router.get("/", auth, validateAdmin, cartController.getCarts)
router.get("/:id", auth, cartController.getCartById)
router.post("/", auth, cartController.addProductToCart)
router.delete("/:id", auth, validateAdmin, cartController.deleteCartById)
//router.put("/:id", auth, validateAdmin, cartController.editProductById)

const routerCart = router.routes()

module.exports = { routerCart };