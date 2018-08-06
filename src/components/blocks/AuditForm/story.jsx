import React from 'react';
import { storiesOf } from '@storybook/react';

import AuditForm from '.';

import styles from './story.css';

storiesOf('AuditForm', module).add('default', () => (
  <div className={styles.wrapper}>
    <AuditForm />
  </div>
));
