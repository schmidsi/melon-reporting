import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

const stories = require.context('../src', true, /\/story\.(tsx?)$/);

configure(() => {
  return stories.keys().forEach(stories);
}, module);

setOptions({
  hierarchySeparator: /\/|\./, // matches a . or /
  hierarchyRootSeparator: /\|/, //matches a |
  name: 'Melon Reporting',
  url: '#',
});
