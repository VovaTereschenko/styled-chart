const getInnerBarHeight = (barValue: number, maxYValue: number, minYValue: number) =>
  `${(Number(barValue) - minYValue) * 100/(maxYValue - minYValue)}%`

export default getInnerBarHeight