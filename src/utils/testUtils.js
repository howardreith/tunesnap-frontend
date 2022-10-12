// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react';

export function asyncFlush() {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, 0));
}
