import React from 'react';
import * as R from 'ramda';
import { scaleLinear } from 'd3-scale';
import { interpolateRound } from 'd3-interpolate';

import { displayPercent } from '~/utils/functionalBigNumber';
import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const volatilityClasses = [0, 0.0005, 0.02, 0.05, 0.1, 0.15, 0.25, 1];

const VolatilityChart = ({ children }) => {
  const lineHeight = Math.round((16 * 16) / 18);
  const width = Math.round(382 * (16 / 18));
  const height = Math.round(99 * (16 / 18));
  const boxes = volatilityClasses.length - 1;

  const xScale = scaleLinear()
    .domain([0, 7])
    .range([0, width])
    .interpolate(interpolateRound);

  const xClassScale = scaleLinear()
    .domain(volatilityClasses)
    .range(volatilityClasses.map((c, i) => xScale(i)))
    .interpolate(interpolateRound);

  const yScale = n => n * lineHeight;

  return (
    <svg width={width} height={height} className={styles.VolatilityChart}>
      <g>
        {/* Indicator line with tick & label */}
        <g>
          <line
            className={styles.indicatorLine}
            x1={xScale(0)}
            x2={xClassScale(children)}
            y1={yScale(2)}
            y2={yScale(2)}
          />

          <line
            className={styles.line}
            x1={xClassScale(children)}
            x2={xClassScale(children)}
            y1={yScale(2)}
            y2={yScale(1.5)}
          />

          <text
            x={R.cond([
              [R.lt(R.__, xScale(0) + 30), R.always(xScale(0))],
              [R.gt(R.__, xScale(boxes) - 30), R.always(xScale(boxes))],
              [R.T, R.identity],
            ])(xClassScale(children))}
            y={yScale(1)}
            textAnchor={R.cond([
              [R.lt(R.__, xScale(0) + 30), R.always('start')],
              [R.gt(R.__, xScale(boxes) - 30), R.always('end')],
              [R.T, R.always('middle')],
            ])(xClassScale(children))}
          >
            {displayPercent(children)}
          </text>
        </g>

        {/* Top and bottom lines */}
        <g>
          <line
            x1={xScale(0)}
            x2={xScale(7)}
            y1={yScale(2)}
            y2={yScale(2)}
            className={styles.line}
          />
          <line
            x1={xScale(0)}
            x2={xScale(7)}
            y1={yScale(5)}
            y2={yScale(5)}
            className={styles.line}
          />
        </g>

        {/* Boxes: vertical lines, numbers & bottom labels */}
        {volatilityClasses.map((volatilityClass, i) => (
          <g key={volatilityClass}>
            <line
              x1={xScale(i)}
              x2={xScale(i)}
              y1={yScale(2)}
              y2={yScale(5)}
              className={styles.line}
            />
            <text
              x={xScale(i)}
              y={yScale(6)}
              className={styles.smallText}
              textAnchor={R.cond([
                [R.equals(0), R.always('start')],
                [R.equals(7), R.always('end')],
                [R.T, R.always('middle')],
              ])(i)}
            >
              {volatilityClass * 100}%
            </text>
            {i > 0 &&
              (volatilityClasses[i - 1] < children &&
              volatilityClasses[i] > children ? (
                <g>
                  <rect
                    x={xScale(i - 1)}
                    y={yScale(2)}
                    width={xScale(i) - xScale(i - 1)}
                    height={yScale(5) - yScale(2)}
                    className={styles.activeRect}
                  />
                  <text
                    x={xScale(i - 0.5)}
                    y={yScale(3.9)}
                    textAnchor="middle"
                    className={styles.activeText}
                  >
                    {i}
                  </text>
                </g>
              ) : (
                <text x={xScale(i - 0.5)} y={yScale(3.9)} textAnchor="middle">
                  {i}
                </text>
              ))}
          </g>
        ))}
      </g>
    </svg>
  );
};

export default withErrorBoundary(__dirname)(VolatilityChart);
