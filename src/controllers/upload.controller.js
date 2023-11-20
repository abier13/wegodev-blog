const upload = (req, res) => {
  try {
    console.log('req.file', req.file);

    // endpoint upload file
    return true;
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { upload };
