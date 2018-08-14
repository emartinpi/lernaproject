console.log('Hola!' + process.cwd())
module.exports = {
    "roots": [
      `${process.cwd()}`
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]/*,
    "globals": {
      "ts-jest": {
        "tsConfigFile": "../../tsconfig.json"
      }
    }*/
  }