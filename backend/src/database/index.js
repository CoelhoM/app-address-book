const mongoose = require('mongoose');

function onMongoConnect(callback) {
  const uri = process.env.MONGO_URI;

  try {
    mongoose.connect(uri);
    callback();
  } catch (error) {
    console.log(error);
  }
}

module.exports = onMongoConnect;
