import * as process from 'process';
import { ApiClient } from '../apiClient';
import { adminActivatedResponse } from '../../../types/api/admin/adminAccount';
import { Profile } from '../../../types/api/user/getProfile';
import { expect } from '@playwright/test';

const { API_ADMIN_URL, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

const apiClient: ApiClient = new ApiClient(
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  API_ADMIN_URL,
);

export const verifyBusinessViaAdmin = async (id: string, user: Profile) => {
  const response: adminActivatedResponse =
    await apiClient.patchRequestWithToken<adminActivatedResponse>(
      `/account/verifyBusiness/${id}`,
    );
  expect(response.message).toEqual('Business Verified');
  expect(response.data.firstName).toEqual(user.data.account.firstName);
  expect(response.data.email).toEqual(user.data.account.email);
};
