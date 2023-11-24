const yup = require('yup');
const { Posts, Categories, Postcategories } = require('../../models');
const BuildResponse = require('../modules/buildResponse');

const postSchema = yup.object().shape({
  title: yup.string().required('Title harus diisi'),
  description: yup.string().required('Deskripsi harus diisi'),
  status: yup.string().required('Status harus diisi'),
  categoryIds: yup.array().of(yup.string()).required('Category Id harus diisi'),
});

const getAllPosts = async (req, res) => {
  try {
    let { page, pageSize, title } = req.query;

    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;

    let where = {};
    if (title) {
      where = { title };
    }

    const data = await Posts.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where,
      include: [
        {
          model: Categories,
          as: 'categories',
        },
      ],
    });

    const resp = {
      code: res.statusCode,
      message: `${data.length} data sudah diterima`,
      count: data.length,
      data,
    };

    res.status(200).json(resp);
  } catch (error) {
    console.log('Get AllUser :', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Posts.findByPk(id);

    if (!data) {
      res.status(404).json({ message: 'Post tidak ditemukan' });
    }

    const buildResponse = BuildResponse.get({ data });

    res.status(200).json(buildResponse);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(slug);
    const data = await Posts.findAll({ where: { slug }, raw: true });
    if (!data) {
      throw new Error('Slug tidak valid');
    }

    const buildResponse = BuildResponse.get({ data });
    res.status(201).json(buildResponse);
  } catch (error) {
    console.log(error.message);
    res.json({ message: 'Internal server error' });
  }
};

const createPost = async (req, res) => {
  try {
    const { body } = req;

    postSchema.validate(body)
      .then(async (valid) => {
        const {
          title, description, categoryIds, status,
        } = valid;

        const data = await Posts.create({
          status, description, title, slug: title.split(' ').join('-').toLowerCase(),
        });

        for (const index of categoryIds) {
          console.log(index);
          const checkCategory = await Categories.findOne({ where: { id: index }, raw: true });
          if (!checkCategory) {
            return res.status(404).json({ message: 'Category Id tidak ada' });
          }
          await Postcategories.bulkCreate([
            { postId: data.id, categoryId: index },
          ]), { returning: true };
        }

        const buildResponse = BuildResponse.created({ data });
        return res.status(201).json(buildResponse);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    postSchema.validate(body)
      .then(async (valid) => {
        const {
          title, description, categoryIds, status,
        } = valid;

        const checkPost = await Posts.findByPk(id);
        if (!checkPost) {
          res.status(404).json({ message: 'Post tidak ditemukan' });
        }

        await Postcategories.destroy({ where: { postId: id }, force: true });
        const slug = title.split(' ').join('-').toLowerCase();
        await Posts.update({
          title, description, status, slug,
        }, { where: { id } });

        for (const index of categoryIds) {
          const checkCategory = await Categories.findOne({ where: { id: index }, raw: true });
          if (!checkCategory) {
            return res.status(404).json({ message: 'Category Id tidak ada' });
          }
          await Postcategories.bulkCreate([
            { postId: id, categoryId: index },
          ]), { returning: true };
        }

        const data = await Posts.findByPk(id);
        const buildResponse = BuildResponse.updated({ data });
        return res.status(201).json(buildResponse);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Postcategories.destroy({ where: { postId: id }, force: true });
    await Posts.destroy({ where: { id } });
    
    const buildResponse = BuildResponse.deleted();
    return res.status(201).json(buildResponse);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createPost, getAllPosts, getPostBySlug, getPostById, updatePost, deletePost,
};

// const slug = body.title.split(' ').join('-');
// const dataPost = {
//   id: body.id,
//   status: body.status,
//   description: body.description,
//   title: body.title,
//   slug: body.title.split(' ').join('-'),
// };

// console.log(dataPost);

// let postCategory = {};
// for (let i = 0; i < body.categoryId.length; i++) {
//   postCategory = {
//     postId: body.id,
//     categoryId: body.categoryId[i],
//   };
//   console.log(postCategory);
// }

// res.status(201).json({});
