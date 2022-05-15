const getInnerBarHeight = (
  barValue: number,
  maxYValue: number,
  minYValue: number = 0
) => `${((Number(barValue) - minYValue) * 100) / (maxYValue - minYValue)}%`;

export default getInnerBarHeight;
