require('dotenv-extended').load();
const R = require('ramda');
const withCSS = require('@zeit/next-css');

const withComposedConfig = R.compose(withCSS);

module.exports = withComposedConfig({
  distDir: '../build',
  cssModules: true,
});
