const Router = require('koa-router')
const { auth, validateAdmin } = require("../middlewares/middlewares");
const MessageController = require("../controllers/MessageController")

const router = new Router({
    prefix: '/mensajes',
  })

router.get("/", auth, MessageController.getMessages)
router.get("/:id", auth, MessageController.getMessagesById)
router.post("/", auth, MessageController.addMessage)

const routerMessage = router.routes()

module.exports = { routerMessage };