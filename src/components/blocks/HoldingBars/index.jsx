import React from 'react';

const HoldingBars = ({ allocations }) => {
  const lineHeight = Math.round((16 * 16) / 18);
  const width = Math.round((960 + 12) * (16 / 18));
  const height = lineHeight * allocations.lenths;

  return <svg width={width} />;
};

export default HoldingBars;
