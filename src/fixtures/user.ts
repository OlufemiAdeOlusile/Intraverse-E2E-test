import { faker } from '@faker-js/faker';
import { mailLogin, mailUser } from 'src/utils/mailJsClient';
import { Profile } from '../types/api/user/getProfile';
import { getAgentProfile } from '../api/client/agent/agentAccount';

export const PASSWORD: string = '@Test12345';
const { USER_NAME } = process.env;

export enum businessType {
  starterBusiness = 'Starter Business',
  registeredBusinessWithIata = 'Registered business with IATA Licence',
  registeredBusinessWithoutIata = 'Registered business without IATA Licence',
}
export enum typeOfBusiness {
  privateLimited = 'Private Limited',
  soleProprietor = 'Sole proprietor',
  nonRegistered = 'Non-registered',
}
export enum companyPosition {
  owner = 'Owner',
  director = 'Director',
  shareHolder = 'Share Holder',
}

export const defaultUser = async (
  intraBusinessType?: businessType,
  intraTypeOfBusiness?: typeOfBusiness,
  position?: companyPosition,
): Promise<Profile> => {
  const user: mailUser = await mailLogin();
  return {
    message: 'Profile',
    data: {
      account: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: user.username,
        phone: faker.string.numeric(10),
        userType: 'Agent',
        detail: {
          address: {
            businessLocation: faker.location.streetAddress(),
          },
          legalInfo: {
            taxIdentification: faker.string.alphanumeric(7).toUpperCase(),
            companyNumber: faker.string.numeric(8),
          },
          contact: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            position: position || companyPosition.director,
            email: user.username,
            phoneNumber: faker.string.numeric(10),
          },
          agencyName: faker.company.name(),
          agencyType:
            intraBusinessType || businessType.registeredBusinessWithIata,
          registeredBusinessName: faker.company.name(),
          tradingName: faker.company.name(),
          businessPhone: faker.string.numeric(10),
          businessEmail: user.username,
          typeOfBusiness: intraTypeOfBusiness || typeOfBusiness.privateLimited,
        },
      },
    },
  };
};

export const bookingUser = async (): Promise<Profile> => {
  return getAgentProfile(USER_NAME, PASSWORD);
};
