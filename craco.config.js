const path = require("path");

module.exports = {
  reactScriptsVersion: "react-scripts" /* (default value) */,
  webpack: {
    enableTypeChecking: true,
    configure: (webpackConfig, { env, paths }) => {
      const libPath = path.dirname(require.resolve("@backdfund/protocol"));
      const newInclude = new RegExp(`${paths.appSrc}|${libPath}`);
      webpackConfig.module.rules[1].oneOf[2].include = newInclude;
      return webpackConfig;
    },
  },
};
