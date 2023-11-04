const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://meowmatch:letmein123@cluster0.2ullxmv.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connect to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: String,
  age: Number,
  description: String,
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = { Pet };
