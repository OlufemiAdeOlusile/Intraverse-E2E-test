import { faker } from '@faker-js/faker';
import { getNewEmail } from 'src/utils/emailClient';

export interface User {
firstName: string
lastName: string
email: string
password: string
phoneNumber: string
}


export const defaultUser = async (): Promise<User> => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: await getNewEmail(),
        password: '@Test12345',
        phoneNumber: faker.string.numeric(10)
    }
}
    