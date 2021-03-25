import { IDataItem } from '../types'

const fillMissingValues = (data: IDataItem[], cellsNum: number, maxY: number): IDataItem[] => {
  const missingArr = Array.from({length: cellsNum - data.length}, () =>
    ({
      empty: maxY
    })
  )
  return [...data, ...missingArr]
}

export default fillMissingValues
