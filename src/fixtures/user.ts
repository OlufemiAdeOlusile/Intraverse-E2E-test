import { faker } from '@faker-js/faker';

export interface User {
firstName: string
lastName: string
email: string
password: string
phoneNumber: string
}


export const defaultUser = (): User => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: `test-intra-${faker.string.numeric(7)}@yopmail.com`,
        password: '@Test12345',
        phoneNumber: faker.string.numeric(10)
    }
}
    