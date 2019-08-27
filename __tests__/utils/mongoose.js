import mongoose from 'mongoose';

export const MongooseConnect = () => mongoose.connect(
  'mongodb://localhost:27017/auth-app_test',
  {
    useNewUrlParser: true,
  }
);

export const MongooseClose = () => mongoose.connection.close();
