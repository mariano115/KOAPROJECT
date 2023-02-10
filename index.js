//KOA
const session = require("koa-session");
const Koa = require("koa");
const koaPassport = require("koa-passport");
const serve = require("koa-static");
const { configKoaPassport } = require("./config/koaPassport.js");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const mongoose = require("mongoose");
const app = new Koa();
const Config = require("./config");
const { getProducts } = require("./service/ProductsService")
const { createEmptyCart } = require("./service/CartService")
const { loggerDeclaration, getDataUser } = require("./tools/utils");
const { auth } = require("./middlewares/middlewares");
const parseArgs = require("minimist");
const { routerSession } = require("./api/routerSession");
const { routerProduct } = require("./api/routerProduct");
const { routerCart } = require("./api/routerCart");
const { routerMessage } = require("./api/routerMessage");
const logger = loggerDeclaration();

const router = new Router({
  prefix: "/",
});

// sessions
const CONFIG = {
  maxAge: 60000,
  secure: false,
  renew: false,
  rolling: false,
  signed: true,
  /* store: mongoStore.create({
    db: 'Cluster0',
    url: Config.urlMongo
  }) */
};
app.keys = ["secreto"];

app.use(session(CONFIG, app));

// body parser
app.use(bodyParser());

// authentication
configKoaPassport();
app.use(koaPassport.initialize());
app.use(koaPassport.session());

// routes
app.use(routerSession);
app.use(routerProduct);
app.use(routerCart);
app.use(routerMessage);
app.use(router.routes());

app.use(serve("public"));

//Puerto enviado por ARGS
const args = parseArgs(process.argv.slice(2), { default: { PORT: "9090" } });
const PORT = process.env.PORT || args.PORT || 9090;

mongoose.connect(
  Config.urlMongo,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw new Error(`Error de conexión a la base de datos ${err}`);
    logger.info("Base de datos conectada");
  }
);

router.get("/", auth, (ctx, next) => {
  logger.info("Redireccion a ruta '/home' autenticacion Completada");
  ctx.redirect("/home");
});

router.get(
  "login",
  async (ctx, next) => {
    logger.info("Peticion GET a ruta '/login'");
    return koaPassport.authenticate("local", (err, user, info, status) => {
      if (user) {
        ctx.login(user);
        ctx.session.email = user.email;
        ctx.body = { status: "logged in" };
        ctx.redirect("/home");
      } else {
        ctx.status = 401;
        ctx.body = { status: "error" };
      }
    })(ctx);
  }
);

router.get("auth/status", async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.body = { status: "logged in" };
  } else {
    ctx.status = 401;
    ctx.body = { status: "not logged in" };
  }
});

router.get("home", auth, async (ctx) => {
  logger.info("Peticion GET a ruta '/home'");
  try {
    const logedUser = await getDataUser(ctx.session.email);
    const response = {
      products: await getProducts(),
      cart: await createEmptyCart(logedUser.email, logedUser.address),
      user: logedUser,
    };
    ctx.body = response
  } catch (error) {
    logger.warn(error);
    ctx.status = 500;
    ctx.body = "Hubo un problema para acceder a la ruta /home";
  }

});

app.listen(PORT, () => logger.info("servidor Levantado en el puerto " + PORT));
