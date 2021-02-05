const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const routeRouter = require('./route');
const port = process.env.PORT || 9000;

app.use(express.json());
app.use('/', routeRouter);

mongoose.set('useCreateIndex', true);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
    console.log('DB Connected');
  });
