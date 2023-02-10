const Router = require('koa-router')
const { auth } = require("../middlewares/middlewares");
const SessionController = require("../controllers/SessionController");

const router = new Router({
  prefix: '/session',
})

router.post("/register", SessionController.register)
router.get("/logout", SessionController.logout)
router.post("/finishbuy", auth, SessionController.finishBuy)

const routerSession = router.routes()

module.exports = { routerSession };