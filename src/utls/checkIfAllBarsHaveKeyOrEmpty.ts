import {
  IDataItem,
  ILegend,
} from '../types'

const checkIfAllBarsHaveKeyOrEmpty = (data: IDataItem[], key:string) => {
  const checkedData = data.filter(dataItem => dataItem[key] || dataItem[ILegend.empty])
  return checkedData.length === data.length
}
export default checkIfAllBarsHaveKeyOrEmpty
