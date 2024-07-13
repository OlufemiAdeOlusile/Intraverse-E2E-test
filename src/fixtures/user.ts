import { faker } from '@faker-js/faker';
import { mailLogin, mailUser } from 'src/utils/mailJsClient';

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

interface businessDetails {
  businessType: string;
  tradingName: string;
  businessAddress: string;
  businessPhoneNumber: string;
  businessEmail: string;
  legalEntity: {
    businessName: string;
    typeOfBusiness: typeOfBusiness;
    companyNumber: string;
    taxIdentificationNumber: string;
  };
  keyContact: {
    firstName: string;
    lastName: string;
    position: companyPosition;
    contactEmail: string;
    contactPhoneNumber: string;
  };
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailClientPassword?: string;
  phoneNumber: string;
  businessDetail?: businessDetails;
}

export const defaultUser = async (
  intraBusinessType?: businessType,
  intraTypeOfBusiness?: typeOfBusiness,
  position?: companyPosition,
): Promise<User> => {
  const user: mailUser = await mailLogin();
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: user.username,
    password: '@Test12345',
    phoneNumber: faker.string.numeric(10),
    emailClientPassword: user.password,
    businessDetail: {
      businessType:
        intraBusinessType || businessType.registeredBusinessWithIata,
      tradingName: faker.company.name(),
      businessAddress: faker.location.streetAddress(),
      businessPhoneNumber: faker.string.numeric(10),
      businessEmail: user.username,
      legalEntity: {
        businessName: faker.company.name(),
        typeOfBusiness: intraTypeOfBusiness || typeOfBusiness.privateLimited,
        companyNumber: faker.string.numeric(8),
        taxIdentificationNumber: faker.string.alphanumeric(7),
      },
      keyContact: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        position: position || companyPosition.director,
        contactEmail: user.username,
        contactPhoneNumber: faker.string.numeric(10),
      },
    },
  };
};

export const signUpUser = async (
  intraBusinessType?: businessType,
  intraTypeOfBusiness?: typeOfBusiness,
  position?: companyPosition,
): Promise<User> => {
  return {
    firstName: 'Khalid',
    lastName: 'Cummerata',
    email: 'vmisd@belgianairways.com',
    password: '@Test12345',
    phoneNumber: faker.string.numeric(10),
    businessDetail: {
      businessType:
        intraBusinessType || businessType.registeredBusinessWithIata,
      tradingName: faker.company.name(),
      businessAddress: faker.location.streetAddress(),
      businessPhoneNumber: faker.string.numeric(10),
      businessEmail: 'vmisd@belgianairways.com',
      legalEntity: {
        businessName: faker.company.name(),
        typeOfBusiness: intraTypeOfBusiness || typeOfBusiness.privateLimited,
        companyNumber: faker.string.numeric(8),
        taxIdentificationNumber: faker.string.alphanumeric(7),
      },
      keyContact: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        position: position || companyPosition.director,
        contactEmail: 'vmisd@belgianairways.com',
        contactPhoneNumber: faker.string.numeric(10),
      },
    },
  };
};
