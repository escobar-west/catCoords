module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts)",
    "**/?(*.)+(spec|test).+(ts)"
  ],
  "transform": {
    "^.+\\.(ts)$": "ts-jest"
  },
  "testEnvironment": "jest-environment-uint8array"
}
