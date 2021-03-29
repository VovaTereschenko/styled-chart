import {
  IDataItem,
} from '../types'

const fillStackedBarChartWithParents = (data: IDataItem[], key: string) => 
  [...data].map(dataItem => !(key in dataItem) ? Object.assign({}, dataItem, {[key]: 0}) : dataItem)

export default fillStackedBarChartWithParents
