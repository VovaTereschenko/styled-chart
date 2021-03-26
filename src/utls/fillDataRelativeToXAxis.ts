import { IDataItem } from '../types'
import {
  fillMissingValues,
  removeExtraValues,
} from '.'

const fillDataRelativeToXAxis = (data: IDataItem[], xAxisTicksNum: number) => 
  xAxisTicksNum > data.length
    ? fillMissingValues(data, xAxisTicksNum, 100)
    : removeExtraValues(data, xAxisTicksNum)
  
export default fillDataRelativeToXAxis
