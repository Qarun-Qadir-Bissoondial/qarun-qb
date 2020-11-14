module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|ngx-socket-io)', // List any packages here that error
  ],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/cypress/',
    '<rootDir>/src/test.ts',
  ],
  projects: [
    '<rootDir>/apps/voice-list',
    '<rootDir>/apps/medical-records',
    '<rootDir>/apps/tt-pothole-backend',
    '<rootDir>/apps/voice-list-backend',
    '<rootDir>/libs/models',
  ],
};
