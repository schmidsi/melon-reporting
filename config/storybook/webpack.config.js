const path = require('path');
const base = path.resolve(process.cwd(), 'src');

module.exports = config => {
  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    '~/design': path.join(base, 'design'),
    '~/components': path.join(base, 'components'),
    '~/blocks': path.join(base, 'blocks'),
    '~/containers': path.join(base, 'containers'),
    '~/utils': path.join(base, 'utils'),
  });

  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          // Inherit the default babel-loader config from storybook.
          loader: config.module.rules[0].loader,
          options: config.module.rules[0].query,
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    },
  );

  return config;
};
