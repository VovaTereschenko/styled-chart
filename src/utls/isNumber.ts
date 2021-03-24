const isNumber = (val: any): val is number =>
  typeof val === 'number'

export default isNumber
