// Podemos encadenar middlewares
export const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not found - ${req.originalUrl}`);
  next(error);
};

export const errorHandlers = (err, req, res, next) => {
  
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    code: statusCode,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
