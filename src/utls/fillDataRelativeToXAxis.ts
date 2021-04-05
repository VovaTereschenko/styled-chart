import { IDataItem, INotUniqueDataItem } from '../types'
import {
  fillMissingValues,
  removeExtraValues,
  generateUID,
} from '.'


const fillDataRelativeToXAxis = (data: INotUniqueDataItem[], xAxisTicksNum: number): IDataItem[] =>  {  
  let dataWithUniqueIDs = [...data]
  if (xAxisTicksNum > data.length) dataWithUniqueIDs = fillMissingValues(dataWithUniqueIDs, xAxisTicksNum, 100)
  else if (xAxisTicksNum < data.length) dataWithUniqueIDs = removeExtraValues(dataWithUniqueIDs, xAxisTicksNum) 

  dataWithUniqueIDs = dataWithUniqueIDs.map(
    dataItem => !dataItem.dataItemUID
      ? Object.assign(dataItem, {dataItemUID: generateUID()})
      : dataItem)

  return dataWithUniqueIDs  as IDataItem[]
}

export default fillDataRelativeToXAxis
