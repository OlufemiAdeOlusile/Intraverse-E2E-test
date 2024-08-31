import { test } from 'src/fixtures';
import { bookingUser } from 'src/fixtures/user';
import { LoginPage } from 'src/pages/signUpAndLogin/loginPage';
import { BrowserContext, Page } from '@playwright/test';
import { HomePage } from '../../../src/pages/HomePage';
import { Profile } from '../../../src/types/api/user/getProfile';
import { SearchPage } from '../../../src/pages/flight/searchPage';
import { defaultReturnFlightRequestParams } from '../../../src/fixtures/flight/search';
import {
  ResponseData,
  waitForSpecificResponse,
} from '../../../src/api/client/networkCapture';
import { FlightSearchResults } from '../../../src/types/api/flight/searchResponse';
import { OffersPage } from '../../../src/pages/flight/offersPage';

const { BASE_URL } = process.env;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let homePage: HomePage;
let searchPage: SearchPage;
let offersPage: OffersPage;
let user: Profile;
let flightSearchResults: FlightSearchResults;

test.describe.only('Create a basic booking e2e', () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    offersPage = new OffersPage(page);
    user = await bookingUser();

    await page.goto(BASE_URL);
    await loginPage.landOnPage();
    await loginPage.loginUser(user);
    await homePage.clickBookAFlight();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('Create booking', async () => {
    await test.step('Search for a flight', async () => {
      await searchPage.landOnPage();
      await searchPage.search(defaultReturnFlightRequestParams);

      const targetPath: string = '/product/v1/flight/search';
      const responseData: ResponseData<FlightSearchResults> =
        await waitForSpecificResponse<FlightSearchResults>(
          page,
          targetPath,
          40000,
        );
      flightSearchResults = responseData.body;
      console.log('Captured Response:', flightSearchResults);
    });

    await test.step('Choose an offer', async () => {
      await offersPage.landOnPage();
    });
  });
});
