const { loggerDeclaration } = require("../tools/utils");
const SessionService = require("../service/SessionService");
const koaPassport = require("koa-passport");
const logger = loggerDeclaration();

const register = async (ctx, next) => {
  ctx.body = await SessionService.register(ctx.request.body);
};

const logout = async (ctx, next) => {
  logger.info("Peticion POST a ruta '/logout'");
  try {
    ctx.logout()
    ctx.body = { status: "Session closed" };
  } catch (error) {
    logger.warn(error)
    ctx.status = 500;
    ctx.body = { status: "Error in logout" };
  }
};


const loginController = async ctx => {
  
  return koaPassport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user)
      ctx.body = { status: 'logged in' }
    } else {
      ctx.status = 401
      ctx.body = { status: 'error' }
    }
  })(ctx)
}

const finishBuy = async (ctx, next) => {
  ctx.body = await SessionService.finishBuy(ctx.request.body);
};

module.exports = { register, logout, finishBuy, loginController };
