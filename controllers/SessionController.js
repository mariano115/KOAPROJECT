const { loggerDeclaration } = require("../tools/utils");
const SessionService = require("../service/SessionService");
const logger = loggerDeclaration();

const register = async (req, res) => {
  res.send(await SessionService.register(req.body));
};

const logout = (req, res) => {
  logger.info("Peticion POST a ruta '/logout'");
  try {
    res.clearCookie("currentSession");
    req.session.destroy();
    res.status(200).json({
      status: "success",
      message: "Session closed",
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: "Logout error" });
  }
};

const finishBuy = async (req, res) => {
  res.send(await SessionService.finishBuy(req.body));
};

module.exports = { register, logout, finishBuy };
