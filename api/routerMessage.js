const express = require("express");
const router = express.Router();
const { auth, validateAdmin } = require("../middlewares/middlewares");
const MessageController = require("../controllers/MessageController")

router.get("/", auth, MessageController.getMessages)
router.get("/:id", auth, MessageController.getMessagesById)
router.post("/", auth, MessageController.addMessage)

module.exports = router;