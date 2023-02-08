const auth = (req, res, next) => {
  if (req.session?.email) {
    next();
  } else {
    res.send("Deberas loguearte primero para acceder");
  }
};

const validateAdmin = (req, res, next) => {
  if (req.query?.admin == 'true') {
    next();
  } else {
    res.send({error:-1, description:`route ${req.protocol}://${req.get('host')}${req.originalUrl} method ${req.method} not authorized`, })
  }
}

module.exports = {
  auth,
  validateAdmin
};