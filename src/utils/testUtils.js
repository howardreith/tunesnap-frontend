export * from '@testing-library/react'

export function asyncFlush() {
  return new Promise(resolve => setTimeout(resolve, 0));
}