module.exports = {
    preset: "ts-jest",
    testEnviroment: "node",
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    moduleNameMapper: {
        "\\.(css)$": "identity-obj-proxy"
      },
}