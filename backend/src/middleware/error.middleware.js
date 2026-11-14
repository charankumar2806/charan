export const errorHandler = (error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  res.status(status).json({
    error: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {})
  });
};
