import { configure } from '@storybook/react';

const stories = require.context('../src', true, /\/story\.(tsx?)$/);

configure(() => {
  return stories.keys().forEach(stories);
}, module);
