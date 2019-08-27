/**
 * @jest-environment node
 */

import loginValidator from '@validators/login';
import Response from "@tests/utils/response";


describe('The login validator', () => {
  it('should call the next function when validation succeds', async () => {
    const req = {
      body: {
        email: 'renatoperezc@gmail.com',
        password: 'rp101010',
      },
    };
    const res = {};
    const next = jest.fn();
    const result = await loginValidator(req, res, next);

    expect(next.mock.calls.length).toBe(1);
  });

  it('should return a 422 if validation fails', async () => {
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
    const result = await loginValidator(req, res, next);

    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalled();
  });
});
