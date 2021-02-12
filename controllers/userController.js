const User = require('../models/user');
const {registerUserSchema, loginUserSchema} = require('../models/userJoi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const data = req.body;

    await registerUserSchema.validateAsync(data, {abortEarly: false});
    data.email = data.email.toLowerCase();

    const salt = await bcrypt.genSalt(6);
    data.password = await bcrypt.hash(data.password, salt);

    const user = await User.create(data);
    res.status(200).json({status: 'success', data: user});
  } catch (error) {
    if (error._original) {
      res.status(400).json({
        status: 'error',
        message: error.details.map((item) => item.message),
      });
      return;
    }
    if (error.code == '11000') {
      res.status(400).json({status: 'error', message: 'user already exists'});
      return;
    }
    console.log(error);
    res.status(400).json({status: 'error', message: error});
  }
};

const loginUser = async (req, res) => {
  try {
    const data = req.body;

    await loginUserSchema.validateAsync(data, {abortEarly: false});

    const user = await User.findOne({email: data.email.toLowerCase()});

    if (!user) {
      res.status(400).json({
        status: 'fail',
        message: 'user not found, proceed to the signup page',
      });
      return;
    }

    const validatePassword = await bcrypt.compare(data.password, user.password);
    if (!validatePassword) {
      res.status(401).json({status: 'fail', message: 'incorrect password'});
      return;
    }

    const token = jwt.sign({id: user._id}, 'PASSKEY', {expiresIn: '2h'});
    user.token = token;
    user.save();
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    if (error._original) {
      res.status(400).json({
        status: 'fail',
        message: error.details[0].message,
      });
      return;
    }
    res.status(400).json({status: 'fail', message: error});
  }
};

module.exports = {createUser, loginUser};
