import AsyncRetry from 'async-retry';

export const config = {
  RETRY_CONFIG: {
    retries: 3,
    minTimeout: 3000,
    maxTimeout: 10000,
  } as AsyncRetry.Options,
};
