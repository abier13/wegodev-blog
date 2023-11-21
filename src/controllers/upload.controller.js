// const uri = require('url');
const BuildResponse = require('../modules/buildResponse');
const { File } = require('../../models');

const upload = async (req, res) => {
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

    // const data = {
    //   url: fileUrl,
    //   fileName: filename,
    //   type: fileType,
    //   path: filePath,
    // };

    const buildResponse = BuildResponse.created({ data });

    return res.status(201).json(buildResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { upload };
