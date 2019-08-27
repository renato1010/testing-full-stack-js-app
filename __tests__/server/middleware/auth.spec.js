/**
 * @jest-environment node
 */
import User from '@models/User';
import jwt from 'jsonwebtoken';
import config from '@config';
import authMiddleware from '@middleware/auth';
import Response from '@tests/utils/response';
import { MongooseConnect, MongooseClose } from '@tests/utils/mongoose';

describe('The auth middleware', function() {
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

  it('should call the next function if authentication is successful  ', async () => {
    const access_token = createdUser.generateToken();
    const req = { body: { access_token } };
    const res = new Response();
    const next = jest.fn();

    await authMiddleware(req, res, next);

    expect(next.mock.calls.length).toEqual(1);
  });

  it('should return 401 if authentication fails', async () => {
    const req = {
      body: {
        // email: 'renatoperezc@gmail.com',
        password: 'rp101010',
      },
    };
    const res = new Response();
    const next = jest.fn();
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    const result = await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(statusSpy).toBeCalledWith(401);
    expect(jsonSpy).toBeCalledWith({ message: 'Unauthenticated.' });
  });
});
