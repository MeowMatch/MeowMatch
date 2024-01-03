import mongoose, { Document, Schema, Model } from 'mongoose';

const MONGO_URI =
  'mongodb+srv://meowmatch:letmein123@cluster0.2ullxmv.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connect to Mongo DB.'))
  .catch((err) => console.log(err));

export interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.model('User', userSchema);

export { User, IUser as UserInterface};


