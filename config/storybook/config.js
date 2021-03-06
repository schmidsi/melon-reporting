import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

import '../../src/components/global.css';

const stories = require.context(
  '../../src/components',
  true,
  /\/story\.(jsx?)$/,
);

configure(() => {
  return stories.keys().forEach(stories);
}, module);

setOptions({
  hierarchySeparator: /\/|\./, // matches a . or /
  hierarchyRootSeparator: /\|/, //matches a |
  name: 'Melon Reporting',
  url: '#',
});
