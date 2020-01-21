const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");

// NOTE: Do not keep any secrets here -- these are public configs

const devConfig = {
  API_URL: "http://localhost:8000",
};

const prodConfig = {
  API_URL: "https://homebase-backend.herokuapp.com",
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

module.exports = withSass(
  withCss({
    /* config options here */
    env: {
      ...config,
    },
  })
);
