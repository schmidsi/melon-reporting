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

  return config;
};
