const getXAxisValues = (yAxisTicksNum: number, maxValue: number, minValue:number) =>
  Array.from({length: yAxisTicksNum}, (_, i) => {
    const yAxisStep = (maxValue - minValue) / (yAxisTicksNum - 1)
    if (!i) return minValue
    if (i === yAxisTicksNum - 1) return maxValue
    return Math.round(yAxisStep * i + minValue)
  }).reverse()

export default getXAxisValues
