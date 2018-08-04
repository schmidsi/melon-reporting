import React from 'react';
import { scaleTime } from 'd3-scale';
import { interpolateRound } from 'd3-interpolate';
import { addMilliseconds, format } from 'date-fns';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const Tick = ({ anchor, orientation, xScale, y, lineHeight, date }) => (
  <g>
    <line
      x1={xScale(date)}
      y1={y}
      x2={xScale(date)}
      y2={orientation === 'top' ? y - lineHeight / 2 : y + lineHeight / 2}
      className={styles.line}
    />
    <text
      x={xScale(date)}
      y={orientation === 'top' ? y + lineHeight : y - lineHeight}
      textAnchor={anchor}
      className={styles.text}
    >
      {format(date, 'D. MMM YYYY')}
    </text>
  </g>
);

const AuditChart = () => {
  const width = Math.round(960 * (16 / 18));
  const lineHeight = Math.round((16 * 16) / 18);

  const start = new Date(2018, 0, 1);
  const end = new Date(2018, 3, 1);

  const xScale = scaleTime()
    .domain([start, end])
    .range([0, width])
    .interpolate(interpolateRound);

  const yScale = n => n * lineHeight;

  const diff = end - start;
  const middle = addMilliseconds(start, diff / 2);

  console.log(xScale(middle));

  return (
    <svg width={width} className={styles.AuditChart}>
      {/* Top axis */}
      <line
        x1={xScale(start)}
        y1={yScale(2)}
        x2={xScale(end)}
        y2={yScale(2)}
        className={styles.line}
      />

      <g>
        <line
          x1={xScale(start)}
          y1={yScale(2)}
          x2={xScale(start)}
          y2={yScale(1.5)}
          className={styles.line}
        />
        <text
          x={xScale(start)}
          y={yScale(1)}
          textAnchor="start"
          className={styles.text}
        >
          {format(xScale.invert(0), 'D. MMM YYYY')}
        </text>
      </g>

      <g>
        <line
          x1={Math.round(xScale(middle))}
          y1={2 * lineHeight}
          x2={Math.round(xScale(middle))}
          y2={1.5 * lineHeight}
          className={styles.line}
        />
        <text
          x={Math.round(xScale(middle))}
          y={lineHeight}
          textAnchor="middle"
          className={styles.text}
        >
          {format(middle, 'D. MMM YYYY')}
        </text>
      </g>

      <g>
        <line
          x1={width}
          y1={2 * lineHeight}
          x2={width}
          y2={1.5 * lineHeight}
          className={styles.line}
        />
        <text x={width} y={lineHeight} textAnchor="end" className={styles.text}>
          {format(xScale.invert(width), 'D. MMM YYYY')}
        </text>
      </g>

      <g>
        <line
          x1={xScale(start)}
          y1={yScale(3)}
          x2={xScale(new Date(2018, 2, 3))}
          y2={yScale(3)}
          className={styles.line}
        />
      </g>
    </svg>
  );
};

export default withErrorBoundary(__dirname)(AuditChart);
