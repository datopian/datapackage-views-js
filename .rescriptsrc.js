module.exports = [
  {
    jest: config => {
      config.transformIgnorePatterns = ["node_modules/?!(react-pdf-js)"];
      return config
    }
  }
]
