const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");

// TODO: I don't know if this is kosher but it seems to work
module.exports = withSass(
  withCss({
    /* config options here */
  })
);
