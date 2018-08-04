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
      y={orientation === 'top' ? y - lineHeight : y + lineHeight}
      textAnchor={anchor}
      className={styles.text}
    >
      {format(date, 'D. MMM YYYY')}
    </text>
  </g>
);

const Xaxis = ({ start, middle, end, xScale, y, lineHeight }) => (
  <g>
    <line
      x1={xScale(start)}
      y1={y}
      x2={xScale(end)}
      y2={y}
      className={styles.line}
    />

    <Tick
      anchor="start"
      orientation="top"
      date={xScale.invert(0)}
      xScale={xScale}
      y={y}
      lineHeight={lineHeight}
    />

    <Tick
      anchor="middle"
      orientation="top"
      date={middle}
      xScale={xScale}
      y={y}
      lineHeight={lineHeight}
    />

    <Tick
      anchor="end"
      orientation="top"
      date={end}
      xScale={xScale}
      y={y}
      lineHeight={lineHeight}
    />
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
      <Xaxis {...{ start, middle, end, xScale, y: yScale(2), lineHeight }} />

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
