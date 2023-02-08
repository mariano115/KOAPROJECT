const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/middlewares");
const SessionController = require("../controllers/SessionController");

router.post("/register", SessionController.register)
router.get("/logout", SessionController.logout)
router.post("/finishbuy", auth, SessionController.finishBuy)

module.exports = router;