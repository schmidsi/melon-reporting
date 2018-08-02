import React from 'react';

import { ComposedChart, Area, Line, Tooltip } from 'recharts';

import { toNumber, multiply } from '~/utils/functionalBigNumber';
import withErrorBoundary from '~/components/utils/withErrorBoundary';
import rezipGrayscale from '~/components/utils/rezipGrayscale';

import styles from './styles.css';

const InvestorChart = ({
  width = 960 * (16 / 18),
  height = 494 * (16 / 18),
  data,
  calculationsHistory,
}) => {
  if (!data.participations) return <h1>No data</h1>;
  const rezippedGrayscale = rezipGrayscale(data.participations.investors);

  return (
    <div className={styles.InvestorChart}>
      <ComposedChart
        width={width}
        height={height}
        data={calculationsHistory}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      >
        <Tooltip />
        <Line
          key="aum,"
          dataKey={k => toNumber(k.aum)}
          stroke="#000000"
          dot={false}
          type="stepBefore"
        />

        {data.participations.investors.map((investor, i) => {
          const color = rezippedGrayscale[i];
          console.log(i, data.participations.investors[i]);
          return (
            <Area
              key={investor.address}
              dataKey={k =>
                toNumber(multiply(k.investors[i].percentage, k.aum))
              }
              stackId="0"
              stroke={color}
              fill={color}
              type="stepBefore"
            />
          );
        })}
      </ComposedChart>
    </div>
  );
};

export default withErrorBoundary(__dirname)(InvestorChart);
