import AsyncRetry from 'async-retry';

export const config = {
  RETRY_CONFIG: {
    retries: 3,
    minTimeout: 4000,
    maxTimeout: 12000,
  } as AsyncRetry.Options,
};
