import { faker } from '@faker-js/faker';
import { mailLogin, mailUser } from 'src/utils/mailJsClient';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailClientPassword?: string;
  phoneNumber: string;
}

export const defaultUser = async (): Promise<User> => {
  const user: mailUser = await mailLogin();
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: user.username,
    password: '@Test12345',
    phoneNumber: faker.string.numeric(10),
    emailClientPassword: user.password,
  };
};
