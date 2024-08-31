import { Page, Request, Response } from '@playwright/test';

interface RequestData {
  url: string;
  method: string;
  headers: Record<string, string>;
  postData: string | null;
  path: string;
}

export interface ResponseData<T = any> {
  url: string;
  status: number;
  headers: Record<string, string>;
  body: T | null;
  path: string;
}

const parseUrl = (url: string): { path: string } => {
  const parsedUrl: URL = new URL(url);
  return {
    path: parsedUrl.pathname,
  };
};

export const captureSpecificRequest = (
  page: Page,
  targetPath: string,
  callback: (request: RequestData) => void,
) => {
  const onRequest = (request: Request) => {
    const { path } = parseUrl(request.url());
    if (path.includes(targetPath)) {
      const requestData: RequestData = {
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        postData: request.postData(),
        path,
      };
      callback(requestData);
    }
  };

  page.on('request', onRequest);

  return () => {
    page.off('request', onRequest);
  };
};

export const waitForSpecificResponse = async <T = any>(
  page: Page,
  targetPath: string,
  timeout: number = 10000,
): Promise<ResponseData<T>> => {
  return new Promise((resolve, reject): void => {
    const timeoutId = setTimeout((): void => {
      page.off('response', onResponse);
      reject(
        new Error(`Timeout: No response for ${targetPath} within ${timeout}ms`),
      );
    }, timeout);

    const onResponse = async (response: Response): Promise<void> => {
      const { path } = parseUrl(response.url());
      if (path.includes(targetPath)) {
        clearTimeout(timeoutId);

        let body: T | null;

        try {
          body = (await response.json()) as T;
        } catch {
          body = (await response.text()) as any;
        }

        const responseData: ResponseData<T> = {
          url: response.url(),
          status: response.status(),
          headers: response.headers(),
          body,
          path,
        };

        page.off('response', onResponse);
        resolve(responseData);
      }
    };

    page.on('response', onResponse);
  });
};
