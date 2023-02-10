const auth = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.body = {
      message: "Deberas loguearte primero para acceder",
    }
  }
};

const validateAdmin = async (ctx, next) => {
  if (ctx.request.query.admin == 'true') {
    await next();
  } else {
    res.send({error:-1, description:`route ${req.protocol}://${req.get('host')}${req.originalUrl} method ${req.method} not authorized`, })
  }
}

module.exports = {
  auth,
  validateAdmin
};