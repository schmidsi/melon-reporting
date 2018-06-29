module.exports = {
  components: 'src/**/*.{js,jsx,ts,tsx}',
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json',
    [
      {
        skipPropsWithoutDoc: false,
      },
    ],
  ).parse,
};
