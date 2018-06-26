const R = require('ramda');
const withTypeScript = require('@zeit/next-typescript');
const withLinkedDependencies = require('./config/withLinkedDependencies');

const withComposedConfig = R.compose(
  withLinkedDependencies,
  withTypeScript,
);

module.exports = withComposedConfig({
  distDir: '../build',
  linkedDependencies: [['@melonproject/data-extractor', 'src']],
});
