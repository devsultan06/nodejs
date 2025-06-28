const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${req.get("host")} ${req.protocol}`);
  next();
};


export default logger;