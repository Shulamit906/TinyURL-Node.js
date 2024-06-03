import mongoose from "mongoose";

// Replace the uri string with your connection string.
const uriLocal = 'mongodb://localhost:27017/TinyURL';

const connectDB = async () => {
  await mongoose.connect(uriLocal, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

export default connectDB;
