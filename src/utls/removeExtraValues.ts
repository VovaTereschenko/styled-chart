import { IDataItem } from '../types'

const removeExtraValues = (data: IDataItem[], cellsNum: number): IDataItem[] =>
  data.slice(data.length - cellsNum, data.length )

export default removeExtraValues
