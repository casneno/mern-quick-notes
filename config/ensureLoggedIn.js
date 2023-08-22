module.exports = function (res,req,next) {
  if (!req.user) return res.status(401).json('Unauthorized');
  next();
}