const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// untuk menangani request json
app.use(express.json());

// Import Router
const uploadRouter = require('./src/routes/upload.routes');
const userRouter = require('./src/routes/user.routes');
const authRouter = require('./src/routes/auth.routes');


// Routes Import
app.use(express.static(path.join(__dirname)));
app.use('/api', uploadRouter);
app.use('/api', userRouter);
app.use('/api', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
