import { CabinClass } from './searchRequest';

export enum FlightLeg {
  RETURN = 'Return',
  ONE_WAY = 'One way',
  MULTI_CITY = 'Multi-city',
}

export enum Supplier {
  Intra1A = 'Intra1A',
  Intra1FR = 'Intra1FR',
  Intra2A = 'Intra2A',
  Intra1PK = 'Intra1PK',
  Intra1MR = 'Intra1MR',
  Intra1XA = 'Intra1XA',
}

type FlightDate = {
  from: string;
  to: string;
  dateOffset: number;
  day: string;
};

export type FlightSearchParam = {
  flightLeg?: FlightLeg;
  cabinClass: CabinClass;
};

export type dateParam = {
  depart: FlightDate;
  return?: FlightDate;
};

export type FlightRequestParams = {
  dateParams: dateParam[];
  searchParams?: FlightSearchParam;
};
