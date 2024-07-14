import * as process from 'process';
import { ApiClient } from '../apiClient';
import { adminActivatedResponse } from '../../../types/api/admin/adminAccount';
import { User } from '../../../fixtures/user';
import { expect } from '@playwright/test';

const { API_ADMIN_URL, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

const apiClient: ApiClient = new ApiClient(
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  API_ADMIN_URL,
);

export const verifyBusinessViaAdmin = async (id: string, user: User) => {
  console.log('test');
  const response: adminActivatedResponse =
    await apiClient.patchRequestWithToken<adminActivatedResponse>(
      `/account/verifyBusiness/${id}`,
    );
  expect(response.message).toEqual('Business Verified');
  expect(response.data.firstName).toEqual(user.firstName);
  expect(response.data.email).toEqual(user.email);
};
