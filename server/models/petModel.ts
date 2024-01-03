import mongoose, { Document, Schema } from 'mongoose';

const MONGO_URI =
  'mongodb+srv://meowmatch:letmein123@cluster0.2ullxmv.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connect to Mongo DB.'))
  .catch((err) => console.log(err));

interface IPet extends Document {
  name: String;
  age: Number;
  description: String;
  url: String;
}

const petSchema = new Schema<IPet>({
  name: String,
  age: Number,
  description: String,
  url: String,
});

const Pet = mongoose.model<IPet>('Pet', petSchema);

export { Pet, IPet };
