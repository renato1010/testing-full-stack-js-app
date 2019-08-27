/**
 * @jest-environment node
 */
import User from '@models/User';
import Bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '@config';
import { MongooseConnect, MongooseClose } from "@tests/utils/mongoose";


describe('The User model', function() {
  let user;
  let createdUser;
  beforeAll(async () => {
    await MongooseConnect();
    user = {
      name: 'Test User',
      email: 'test@user.com',
      password: 'password',
    };
    createdUser = await User.create(user);
  });
  afterAll(async () => {
    await MongooseClose();
  });
  it('should hash the user password before saving to the database', async () => {
    expect(
      Bcrypt.compareSync(user.password, createdUser.password)
    ).toBeTruthy();
  });

  it('should set the email confirm code for the user before saving to the database', async () => {
    expect(createdUser.emailConfirmCode).toEqual(expect.any(String));
  });

  it('should generate a valid jwt for user', async () => {
    const token = createdUser.generateToken();
    const { id } = jwt.verify(token, config.jwtSecret);

    // console.log("token-id: ", id);
    // console.log("created user id: ", createdUser._id);

    expect(id).toEqual(createdUser._id.toString());
  });
});
