import React from 'react';
import { scaleTime } from 'd3-scale';
import { interpolateRound } from 'd3-interpolate';
import { format } from 'date-fns';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import { parseTimestamp } from '~/utils/timestamp';

import styles from './styles.css';

const Tick = ({ anchor, orientation, xScale, y, lineHeight, date }) => (
  <g>
    <line
      x1={xScale(date)}
      y1={y}
      x2={xScale(date)}
      y2={y - lineHeight / 2}
      className={styles.line}
    />
    <text
      x={xScale(date)}
      y={orientation === 'top' ? y - lineHeight : y + lineHeight}
      textAnchor={anchor}
      className={styles.text}
    >
      {format(date, 'D. MMM')}
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
      className={styles.axis}
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

const Entry = ({ start, end, xScale, y, lineHeight }) => (
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

const AuditChart = ({
  start,
  end,
  width = Math.round(960 * (16 / 18)),
  children = [],
  greenTimeSpans = [],
  redTimeSpans = [],
}) => {
  const lineHeight = Math.round((16 * 16) / 18);

  const xScale = scaleTime()
    .domain([parseTimestamp(start), parseTimestamp(end)])
    .range([0, width])
    .interpolate(interpolateRound);

  const yScale = n => n * lineHeight;

  const diff = end - start;
  const middle = end - diff / 2;

  return (
    <svg
      width={width}
      height={(2 + children.length) * lineHeight * 2}
      className={styles.AuditChart}
    >
      <Xaxis
        start={parseTimestamp(start)}
        middle={parseTimestamp(middle)}
        end={parseTimestamp(end)}
        xScale={xScale}
        y={yScale(2)}
        lineHeight={lineHeight}
      />

      {greenTimeSpans.map(({ timespanStart, timespanEnd }) => (
        <Indicator
          key={`${timespanStart}-${timespanEnd}`}
          start={xScale(parseTimestamp(timespanStart))}
          end={xScale(parseTimestamp(timespanEnd))}
          type="green"
          y={yScale(2)}
        />
      ))}

      {redTimeSpans.map(({ timespanStart, timespanEnd }) => (
        <Indicator
          key={`${timespanStart}-${timespanEnd}`}
          start={xScale(parseTimestamp(timespanStart))}
          end={xScale(parseTimestamp(timespanEnd))}
          type="red"
          y={yScale(2)}
        />
      ))}

      {children.map((audit, i) => (
        <Entry
          key={audit.dataHash}
          start={parseTimestamp(audit.timespanStart)}
          end={parseTimestamp(audit.timespanEnd)}
          xScale={xScale}
          y={yScale(3 + i * 2)}
          lineHeight={lineHeight}
        />
      ))}
    </svg>
  );
};

export default withErrorBoundary(__dirname)(AuditChart);
