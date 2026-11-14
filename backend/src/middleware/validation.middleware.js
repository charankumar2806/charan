export const validate = (schema) => (req, res, next) => {
  const payload = req.body || req.query || {};
  const result = schema.safeParse(payload);
  if (!result.success) {
    return res.status(400).json({ error: 'Validation failed', details: result.error.issues });
  }
  req.validated = result.data;
  next();
};
