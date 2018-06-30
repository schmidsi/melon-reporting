const R = require('ramda');
const withTypeScript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');

const withComposedConfig = R.compose(
  withTypeScript,
  withCSS,
);

module.exports = withComposedConfig({
  distDir: '../build',
  cssModules: true,
});
