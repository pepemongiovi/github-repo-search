/* eslint-disable @typescript-eslint/no-unsafe-return */

import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub';
  },
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/services/github-api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/github-api'),
}));
