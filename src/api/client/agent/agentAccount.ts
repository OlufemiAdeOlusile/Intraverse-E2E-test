import process from 'process';
import { Profile } from '../../../types/api/user/getProfile'; // Import the Profile type
import { ApiClient } from '../apiClient';
import { AccountResponse } from '../../../types/api/admin/adminAccount';
import { PASSWORD } from '../../../fixtures/user';

const { API_BASE_URL } = process.env;
let apiClient: ApiClient;

export const getAgentAccountId = async (user: Profile): Promise<string> => {
  apiClient = new ApiClient(user.data.account.email, PASSWORD, API_BASE_URL);
  const accountResponse: AccountResponse = await apiClient.init();
  return accountResponse.data.account._id;
};

export const getAgentProfile = async (
  email: string,
  password: string,
): Promise<Profile> => {
  apiClient = new ApiClient(email, password, API_BASE_URL);
  return await apiClient.getRequestWithToken<Profile>(
    '/account/profile?populate=detail',
  );
};
