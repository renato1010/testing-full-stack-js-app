/**
 * @jest-environment node
 */

import supertest from 'supertest';
import server from '@server/app';
import { MongooseClose } from '../../utils/mongoose';
import User from '@models/User';

const app = () => supertest(server);

describe('The register process', () => {
  const EMAIL_CONFIRM_EDNPOINT = '/api/v1/auth/emails/confirm';
  let user = {
    name: 'Test User',
    email: 'test@user.com',
    password: 'password',
  };
  beforeEach(async () => {
    // clears database collection User before every test
    await User.deleteMany({});
  });
  afterAll(() => {
    MongooseClose();
  });

  it('return a 422 if token is invalid', async () => {
    // send invalid token to endpoint
    const response = await app()
      .post(EMAIL_CONFIRM_EDNPOINT)
      .send({ token: 'faketoken' });
    expect(response.status).toBe(422);
    expect(response.body.data.errors).toEqual({
      email: 'Invalid email confirmation token.',
    });
  });

  it('should confirm a user email', async () => {
    const createdUser = await User.create(user);

    const response = await app()
      .post(EMAIL_CONFIRM_EDNPOINT)
      .send({ token: createdUser.emailConfirmCode });

    expect(response.status).toEqual(200);
    expect(response.body.data.user.email).toEqual(user.email);
    expect(response.body.data.user.emailConfirmCode).toBeNull();
    expect(response.body.data.user.emailConfirmedAt).toBeDefined();

    // check if after confirm email everything is ok
    const currentUser = await User.findOne({ email: createdUser.email });

    expect(currentUser.emailConfirmCode).toBeNull();
    expect(currentUser.emailConfirmedAt).toBeDefined();
  });
});
