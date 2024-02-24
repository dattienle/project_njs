const validateMiddleware = (req, res, next) => {
    try {
      if (!req.body) {
        throw new Error('Request body is missing');
      }
      if (!req.body.title || req.body.title.trim() === '') {
        throw new Error('Title is required');
      }
      if (!req.body.content || req.body.content.trim() === '') {
        throw new Error('Content is required');
      }
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  export { validateMiddleware };
  