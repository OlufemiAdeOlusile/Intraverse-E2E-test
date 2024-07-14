import process from 'process';
import { User } from '../../../fixtures/user';
import { ApiClient } from '../apiClient';
import { AccountResponse } from '../../../types/api/admin/adminAccount';

const { API_BASE_URL } = process.env;
let apiClient: ApiClient;

export const getAgentAccountId = async (user: User): Promise<string> => {
  apiClient = new ApiClient(user.email, user.password, API_BASE_URL);
  const accountResponse: AccountResponse = await apiClient.init();
  return accountResponse.data.account._id;
};
