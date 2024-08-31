import { BasePage } from '../basePage';
import { expect, Locator, Page } from '@playwright/test';
import { fillCalendar, ROLE_NAMES } from '../../utils/dto';
import { FlightRequestParams } from '../../types/api/flight/searchParam';

export class SearchPage extends BasePage {
  readonly goBackButton: Locator;
  readonly ordersBreadcrumb: Locator;
  readonly newOrderBreadcrumb: Locator;
  readonly returnRadioButton: Locator;
  readonly oneWayRadioButton: Locator;
  readonly multiCityRadioButton: Locator;
  readonly originInput: Locator;
  readonly destinationInput: Locator;
  readonly departureDateField: Locator;
  readonly returnDateField: Locator;
  readonly passengerSelector: Locator;
  readonly travelClassSelector: Locator;
  readonly advancedOptionsButton: Locator;
  readonly searchFlightsButton: Locator;
  readonly goToNextMonth: Locator;

  constructor(page: Page) {
    super(page);
    this.goBackButton = page.getByText(/go back/i);
    this.ordersBreadcrumb = page.getByRole('link', { name: /orders/i });
    this.newOrderBreadcrumb = page.getByText(/new order/i);
    this.returnRadioButton = page.getByRole('radio', { name: /return/i });
    this.oneWayRadioButton = page.getByRole('radio', { name: /one way/i });
    this.multiCityRadioButton = page.getByRole('radio', {
      name: /multi-city/i,
    });
    this.originInput = page.getByLabel(/where from\?/i);
    this.destinationInput = page.getByLabel(/where to\?/i);
    this.departureDateField = page.getByRole(ROLE_NAMES.GROUP, {
      name: /departure date/i,
    });
    this.returnDateField = page.getByRole(ROLE_NAMES.GROUP, {
      name: /return date/i,
    });
    this.passengerSelector = page.getByRole('button', { name: /passenger/i });
    this.travelClassSelector = page.getByText(/travel class/i);
    this.advancedOptionsButton = page.getByText(/advanced options/i);
    this.searchFlightsButton = page.getByRole(ROLE_NAMES.BUTTON, {
      name: /search for flights/i,
    });
    this.goToNextMonth = page.getByLabel('Go to next month');
  }

  async landOnPage() {
    await expect(this.departureDateField.first()).toBeVisible();
  }

  async search(flightParams: FlightRequestParams): Promise<void> {
    const whereFrom: string = flightParams.dateParams[0].depart.from;
    await this.originInput.clear();
    await this.originInput.fill(whereFrom);
    await this.page.getByText(whereFrom, { exact: true }).nth(1).click();

    const whereTo: string = flightParams.dateParams[0].return.from;
    await this.destinationInput.clear();
    await this.destinationInput.fill(whereTo);
    await this.page.getByText(whereTo, { exact: true }).nth(1).click();

    await this.departureDateField.click();
    const departMonthOffset: number =
      flightParams.dateParams[0].depart.dateOffset;
    const departDay: string = flightParams.dateParams[0].depart.day;
    await fillCalendar(this.page, departMonthOffset, departDay);

    const returnMonthOffset: number =
      flightParams.dateParams[0].return.dateOffset;
    const returnDay: string = flightParams.dateParams[0].return.day;
    await fillCalendar(
      this.page,
      returnMonthOffset - departMonthOffset,
      returnDay,
    );

    await this.searchFlightsButton.waitFor({ state: 'visible' });
    await this.searchFlightsButton.click();
  }
}
