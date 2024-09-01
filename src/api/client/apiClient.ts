import { request } from '@playwright/test';
import { APIRequestContext, APIResponse } from 'playwright';
import { Serializable } from 'playwright-core/types/structs';
import { AccountResponse } from '../../types/api/admin/adminAccount';
import retry from 'async-retry';
import { config } from '../../utils/config';

export class ApiClient {
  readonly email: string;
  readonly password: string;
  readonly url: string;
  token: string;
  requestContext: APIRequestContext;
  loginPath: string = '/account/login?populate=detail';
  postResponseBody: AccountResponse;

  constructor(email: string, password: string, url: string) {
    this.email = email;
    this.password = password;
    this.url = url;
  }

  async init(): Promise<AccountResponse> {
    this.requestContext = await request.newContext({});

    await retry(async () => {
      let apiResponse: APIResponse;

      try {
        apiResponse = await this.requestContext.post(
          this.url + this.loginPath,
          {
            data: {
              email: this.email,
              password: this.password,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!apiResponse.ok()) {
          throw new Error('API returned an error response');
        }

        this.postResponseBody = (await apiResponse.json()) as AccountResponse;

        if (!this.postResponseBody.data.token) {
          throw new Error('No token provided');
        }
      } catch (error) {
        console.log(`Attempt failed: ${error.message}`);
        throw error;
      }
    }, config.RETRY_CONFIG);

    this.token = this.postResponseBody.data.token;
    return this.postResponseBody;
  }

  async postRequestWithToken<T>(path: string, data: Serializable): Promise<T> {
    if (!this.token) {
      await this.init();
    }
    const apiResponsePromise: APIResponse = await this.requestContext.post(
      this.url + path,
      {
        data,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (apiResponsePromise.ok()) {
      return (await apiResponsePromise.json()) as T;
    } else {
      throw new Error(
        `Failed to Post Request: ${apiResponsePromise.status()} ${apiResponsePromise.statusText()}`,
      );
    }
  }

  async getRequestWithToken<T>(path: string): Promise<T> {
    if (!this.token) {
      await this.init();
    }
    const apiResponsePromise: APIResponse = await this.requestContext.get(
      this.url + path,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (apiResponsePromise.ok()) {
      return (await apiResponsePromise.json()) as T;
    } else {
      throw new Error(
        `Failed to Post Request: ${apiResponsePromise.status()} ${apiResponsePromise.statusText()}`,
      );
    }
  }

  async patchRequestWithToken<T>(
    path: string,
    data?: Serializable,
  ): Promise<T> {
    if (!this.token) {
      await this.init();
    }
    const apiResponsePromise: APIResponse = await this.requestContext.patch(
      this.url + path,
      {
        data: data || {},
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (apiResponsePromise.ok()) {
      return (await apiResponsePromise.json()) as T;
    } else {
      throw new Error(
        `Failed to Post Request: ${apiResponsePromise.status()} ${apiResponsePromise.statusText()}`,
      );
    }
  }
}
