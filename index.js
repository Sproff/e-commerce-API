const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const routeRouter = require('./route');
const port = process.env.PORT || 9000;

app.use(express.json());
app.use('/', routeRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
    console.log('DB Connected Successfully');
  });
