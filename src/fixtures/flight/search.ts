import {
  FlightLeg,
  dateParam,
  FlightRequestParams,
  Supplier,
} from '../../types/api/flight/searchParam';
import {
  CabinClass,
  Currency,
  Destination,
  FlightRequest,
  FlightType,
  OriginDestination,
} from '../../types/api/flight/searchRequest';
import { calculateDate } from '../../utils/utility';

export const defaultReturnFlightRequestParams: FlightRequestParams = {
  searchParams: {
    flightLeg: FlightLeg.RETURN,
    cabinClass: CabinClass.Economy,
  },
  dateParams: [
    {
      depart: {
        from: 'LOS',
        to: 'LHR',
        dateOffset: 1,
        day: '10',
      },
      return: {
        from: 'LHR',
        to: 'LOS',
        dateOffset: 1,
        day: '20',
      },
    },
  ],
};

export const flightRequestApiTemplate = (
  params: FlightRequestParams,
): FlightRequest => {
  const originDestinations: OriginDestination[] = params.dateParams
    .map((param: dateParam): OriginDestination[] => {
      const fromDate: { date: string; fullDate: string } = calculateDate(
        param.depart.dateOffset,
        param.depart.day,
      );
      const toDate: { date: string; fullDate: string } = param.return
        ? calculateDate(param.return.dateOffset, param.return.day)
        : null;

      const originDestination: OriginDestination = {
        from: param.depart.from,
        to: param.depart.to,
        departure: { date: fromDate.date },
        date: fromDate.fullDate,
      };

      return toDate
        ? [
            originDestination,
            {
              from: param.return!.from,
              to: param.return!.to,
              departure: { date: toDate.date },
              date: toDate.fullDate,
            },
          ]
        : [originDestination];
    })
    .flat();

  const destinations: Destination[] = params.dateParams
    .map((param: dateParam): Destination[] => {
      const fromDate: { date: string; fullDate: string } = calculateDate(
        param.depart.dateOffset,
        param.depart.day,
      );
      const toDate: { date: string; fullDate: string } = param.return
        ? calculateDate(param.return.dateOffset, param.return.day)
        : null;

      const destination: Destination = {
        departureLocation: param.depart.from,
        arrivalLocation: param.depart.to,
        date: fromDate.fullDate,
      };

      return toDate
        ? [
            destination,
            {
              departureLocation: param.return!.from,
              arrivalLocation: param.return!.to,
              date: toDate.fullDate,
            },
          ]
        : [destination];
    })
    .flat();

  return {
    supplier: [
      Supplier.Intra1A,
      Supplier.Intra1FR,
      Supplier.Intra2A,
      Supplier.Intra1PK,
      Supplier.Intra1MR,
      Supplier.Intra1XA,
    ],
    currency: Currency.NGN,
    maxSolutions: 100,
    originDestinations,
    passengers: {
      adult: 1,
    },
    cabinClass: [params.searchParams.cabinClass],
    travelClass: params.searchParams.cabinClass,
    flightType: FlightType.International,
    requestedFlightTypes: null,
    destinations,
    flightFilters: {},
  };
};
