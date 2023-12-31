const yup = require('yup');
const BuildResponse = require('../modules/buildResponse');
const { Categories } = require('../../models');

const categorySchema = yup.object().shape({
  title: yup.string().required('Title harus diisi'),
});

const getAllCategory = async (req, res) => {
  try {
    let { page, pageSize, title } = req.query;

    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;

    let where = {};
    if (title) {
      where = { title };
    }

    const data = await Categories.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where,
    });

    const totalData = await Categories.count();

    const resp = {
      code: res.statusCode,
      message: `${data.length} data sudah diterima`,
      count: totalData,
      data,
    };

    res.status(200).json(resp);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Categories.findByPk(id);

    if (!data) {
      res.status(404).json({ message: 'Category tidak ditemukan' });
    }

    const buildResponse = BuildResponse.get({ data });

    res.status(200).json(buildResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { body } = req;

    categorySchema.validate(body)
      .then(async (valid) => {
        const { title } = valid;
        const data = await Categories.create({
          title,
        });

        const buildResponse = BuildResponse.created({ data });
        res.status(201).json(buildResponse);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    categorySchema.validate(body)
      .then(async (valid) => {
        const { title } = valid;
        const data = { title };

        await Categories.update({ title }, { where: { id } });

        const buildResponse = BuildResponse.updated({ data });
        return res.status(201).json(buildResponse);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Categories.destroy({ where: { id } });

    const buildResponse = BuildResponse.deleted({});
    res.status(201).json(buildResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory,
};
