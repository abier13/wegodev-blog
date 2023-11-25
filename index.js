const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();
const port = 3000;

// untuk menangani request json
app.use(express.json());

// config swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentasion Blog',
      version: '0.0.1',
      description: 'Belajar NodeJs',
    },
  },
  apis: ['./src/routes/*.js'],
};

// Import Router
const uploadRouter = require('./src/routes/upload.routes');
const userRouter = require('./src/routes/user.routes');
const authRouter = require('./src/routes/auth.routes');
const categoryhRouter = require('./src/routes/category.routes');
const postsRouter = require('./src/routes/posts.routes');

// Routes Import
app.use(express.static(path.join(__dirname)));
app.use('/v1', uploadRouter);
app.use('/v1', userRouter);
app.use('/v1', authRouter);
app.use('/v1', categoryhRouter);
app.use('/v1', postsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
