import React from 'react';
import { storiesOf } from '@storybook/react';

import VolatilityChart from '.';

import styles from './story.css';

// import mockData from './mockData';

storiesOf('VolatilityChart', module)
  .add('default', () => (
    <div className={styles.wrapper}>
      <VolatilityChart>{0.195}</VolatilityChart>
    </div>
  ))
  .add('start', () => (
    <div className={styles.wrapper}>
      <VolatilityChart>{0.0002}</VolatilityChart>
    </div>
  ))
  .add('end', () => (
    <div className={styles.wrapper}>
      <VolatilityChart>{0.6}</VolatilityChart>
    </div>
  ))
  .add('random', () => (
    <div className={styles.wrapper}>
      <VolatilityChart>{Math.random() ** 4}</VolatilityChart>
    </div>
  ));
