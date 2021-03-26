const getInnerBarHeight = (barValue: number, maxYValue: number) =>
  `${Number(barValue ) * 100/maxYValue}%`

export default getInnerBarHeight