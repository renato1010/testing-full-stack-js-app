/**
 * @jest-environment node
 */

import supertest from 'supertest';
import server from '@server/app';
import { MongooseClose } from '../../utils/mongoose';
import User from '@models/User';

const app = () => supertest(server);

describe('The register process', () => {
  const REGISTER_ENDPOINT = '/api/v1/auth/register';
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

  it('should register a new user', async () => {
    const response = await app()
      .post(REGISTER_ENDPOINT)
      .send(user);

    // console.log('response-body: ', response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.message).toContain('Account registered');
  });

  it('should return 422 code if registration fails', async () => {
    await User.create(user);

    const response = await app()
      .post(REGISTER_ENDPOINT)
      .send(user);
    expect(response.status).toEqual(422);
    expect(response.body.message).toBe('Validation failed.');
    expect(response.body.data.errors).toEqual({
      email: 'This email has already been taken.',
    });
  });
});
