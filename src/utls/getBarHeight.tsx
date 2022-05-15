const getBarHeight = (barValue: number, maxYAxis: number, minYAxis: number) =>
  (Number(barValue - minYAxis) * 100) / (maxYAxis - minYAxis);

export default getBarHeight;
