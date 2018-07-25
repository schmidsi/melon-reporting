const path = require('path');

module.exports = config => {
  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          url: false,
        },
      },
    ],
  });

  config.resolve.alias = {
    '~/components': path.resolve(__dirname, '../../src/components'),
  };

  console.log('XXXX', config.resolve, __dirname);

  return config;
};
