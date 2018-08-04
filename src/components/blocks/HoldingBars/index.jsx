import React from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateRound } from 'd3-interpolate';

import styles from './styles.css';

const HoldingBars = ({ allocations, children }) => {
  const lineHeight = Math.round((16 * 16) / 18);
  const width = Math.round((960 + 12) * (16 / 18));
  const height = 2 * lineHeight * (allocations.length + 2);

  const xScale = scaleLinear()
    .domain([0, 1])
    .range([0, width])
    .interpolate(interpolateRound);

  const yScale = n => n * lineHeight;

  return (
    <div style={{ width, height }} className={styles.holder}>
      <svg style={{ width, height }} className={styles.underlay}>
        {allocations.map((holding, i) => (
          <rect
            key={holding.token.symbol}
            x={0}
            y={yScale(2 * i)}
            height={yScale(1.5)}
            width={xScale(holding.percentage)}
            className={styles.holding}
          />
        ))}
        <rect
          x={0}
          y={yScale(2 * allocations.length)}
          height={yScale(1.5)}
          width={xScale(1)}
          className={styles.sum}
        />
      </svg>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default HoldingBars;
