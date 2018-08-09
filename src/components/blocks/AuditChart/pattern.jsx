import React from 'react';
import { scaleTime } from 'd3-scale';
import { interpolateRound } from 'd3-interpolate';
import { format } from 'date-fns';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import { parseTimestamp } from '~/utils/timestamp';

import styles from './styles.css';

const Xaxis = ({ start, middle, end, xScale, y, lineHeight }) => (
  <g>
    <line
      x1={xScale(start)}
      y1={y}
      x2={xScale(end)}
      y2={y}
      className={styles.axis}
    />
  </g>
);

const Entry = ({ start, end, xScale, y, lineHeight }) => (
  <g>
    <Tick
      anchor="start"
      date={start}
      xScale={xScale}
      y={y}
      lineHeight={lineHeight}
    />
    <Tick
      anchor="end"
      date={end}
      xScale={xScale}
      y={y}
      lineHeight={lineHeight}
    />
  </g>
);

const Indicator = ({ start, end, y, type }) => (
  <g>
    <line x1={start} x2={end} y1={y} y2={y} className={styles[type]} />
  </g>
);

const LineBetweenTwoDates = ({ start, end, width, date1, date2 }) => {
  const xScale = scaleTime()
    .domain([parseTimestamp(start), parseTimestamp(end)])
    .range([0, width])
    .interpolate(interpolateRound);

  return (
    <svg width={width} className={styles.AuditChart}>
      <line
        x1={xScale(date1)}
        y1={1}
        x2={xScale(date2)}
        y2={1}
        className={styles.line}
      />
    </svg>
  );
};

export default withErrorBoundary(__dirname)(AuditChart);
