export enum CabinClass {
  Economy = 'Economy',
  Premium_Economy = 'Premium Economy',
  Business = 'Business',
  First = 'First',
}

export enum Currency {
  NGN = 'NGN',
  USD = 'USD',
  EUR = 'EUR',
}

export enum FlightType {
  International = 'INTERNATIONAL',
  Domestic = 'DOMESTIC',
}

type Departure = {
  date: string;
};

export type OriginDestination = {
  from: string;
  to: string;
  departure: Departure;
  date: string;
};

export type Destination = {
  departureLocation: string;
  arrivalLocation: string;
  date: string;
};

type Passengers = {
  adult: number;
  child?: number;
  infant?: number;
};

export type FlightRequest = {
  supplier: string[];
  currency: Currency;
  maxSolutions: number;
  originDestinations: OriginDestination[];
  passengers: Passengers;
  cabinClass: CabinClass[];
  travelClass: CabinClass;
  flightType: FlightType;
  requestedFlightTypes: null | string;
  destinations: Destination[];
  flightFilters: Record<string, unknown>;
};
