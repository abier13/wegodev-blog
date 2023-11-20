const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function name(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// validasi jenis file
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;

  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb('Error: Hanya diperbolehkan mengunggah file gambar (jpeg/jpg/png)');
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
});

module.exports = { upload };
