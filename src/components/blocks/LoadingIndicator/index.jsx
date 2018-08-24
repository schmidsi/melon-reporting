import React from 'react';

import styles from './styles.css';

const LoadingIndicator = () => (
  <div className={styles.spinner}>
    <p>
      Please wait while we are generating your report. It can take up to several
      minutes ...
    </p>
  </div>
);

export default LoadingIndicator;
