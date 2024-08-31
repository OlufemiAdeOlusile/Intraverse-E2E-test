type Image = {
  url: string;
  description: string;
};

type Airline = {
  image: Image;
  marketing: string;
  operating: string;
};

type FlightSegment = {
  segmentRef: string;
  airline: Airline;
  aircraftType: string;
  aircraftCode: string;
  seatAvailability: string;
  flightNumber: string;
  cabinClass: string;
  cabinCode: string;
  bookingClass: string;
  departure: {
    time: string;
    date: string;
    terminal: string;
    location: string;
    airport: string;
    city: string;
  };
  arrival: {
    time: string;
    date: string;
    terminal: string;
    location: string;
    airport: string;
    city: string;
  };
  duration: string;
  numberOfStops: number;
  baggage: string;
  fareType: (string | null)[];
};

type Destination = {
  from: string;
  to: string;
  departure: {
    date: string;
  };
  date: string;
};

type Price = {
  totalPrice: string;
  basePrice: string;
  taxes: string;
  additionalFee: string;
  ticketingFee: string;
  cardPaymentFee: string;
};

type PassengerFares = {
  adult: {
    basePrice: string;
    taxes: string;
    totalPrice: string;
    passengerCount: number;
  };
};

type PricingInformation = {
  originalCurrency: string;
  convertedCurrency: string;
  price: Price;
  passengerFares: PassengerFares;
};

type FareRule = {
  category: string;
  maxPenaltyAmount: string;
};

type FareRules = {
  rules: FareRule[];
};

type FlightData = {
  id: string;
  supplier: string;
  directions: FlightSegment[][];
  destinations: Destination[];
  pricingInformation: PricingInformation;
  isCombinable: boolean;
  fareRules: FareRules;
  sessionId: string;
};

export type FlightSearchResults = {
  message: string;
  data: {
    data: FlightData[];
  };
};
