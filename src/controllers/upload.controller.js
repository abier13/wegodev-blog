// const uri = require('url');
const BuildResponse = require('../modules/buildResponse');
const { File } = require('../../models');

const uploadFile = async (req, res) => {
  try {
    const { file } = req;
    const { filename, mimetype, path } = file;

    const fileType = mimetype.split('/')[0];
    const filePath = `/${path.replace(/\\/g, '/')}`;
    const fileUrl = `${req.protocol}://${req.get('host')}${filePath}`;

    const data = await File.create({
      fileName: filename,
      type: fileType,
      path: filePath,
      url: fileUrl,
    });

    const buildResponse = BuildResponse.createdUpload({ data });

    return res.status(201).json(buildResponse);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { uploadFile };
