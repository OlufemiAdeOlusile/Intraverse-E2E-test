import { faker } from '@faker-js/faker';

export interface User {
  email: string;
  password: string;
}

export function generateFakeUser(): User {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}
