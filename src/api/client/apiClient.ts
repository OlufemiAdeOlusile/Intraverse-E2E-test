import { request } from '@playwright/test';
import { APIRequestContext, APIResponse } from 'playwright';
import { Serializable } from 'playwright-core/types/structs';
import { AccountResponse } from '../../types/api/admin/adminAccount';

export class ApiClient {
  readonly email: string;
  readonly password: string;
  readonly url: string;
  token: string;
  requestContext: APIRequestContext;
  loginPath: string = '/account/login?populate=detail';

  constructor(email: string, password: string, url: string) {
    this.email = email;
    this.password = password;
    this.url = url;
  }

  async init(): Promise<AccountResponse> {
    this.requestContext = await request.newContext({});
    const apiResponsePromise: APIResponse = await this.requestContext.post(
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

    if (apiResponsePromise.ok()) {
      const postResponseBody: AccountResponse =
        (await apiResponsePromise.json()) as AccountResponse;
      console.log('POST Response:', postResponseBody);
      this.token = postResponseBody.data.token;
      return postResponseBody;
    } else {
      throw new Error(
        `Failed to initialize API client: ${apiResponsePromise.status()} ${apiResponsePromise.statusText()}`,
      );
    }
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
