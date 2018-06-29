import { configure } from '@storybook/react';

function loadStories() {
  require('../src/blocks/DescriptionList/story.tsx');
  // You can require as many stories as you need.
}

configure(loadStories, module);
