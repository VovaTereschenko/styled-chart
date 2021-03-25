const getBarHeight = (barValue: number, maxYAxis: number) =>
  `${Number(barValue) * 100/maxYAxis}%`

export default getBarHeight
