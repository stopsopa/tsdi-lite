import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text"],
  collectCoverageFrom: ["src/**/*.ts"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  resolver: "jest-ts-webcompat-resolver", // to fix: https://i.imgur.com/R9fqgGe.png
};

export default config;
