import { IConfig, IDataItem } from '../types'
import { isRichDataObject } from '.'

const findBarsYAxisMax = (config: IConfig, data: IDataItem[]) => {
  const max = data.reduce((acum, dataItem) => {
    Object
      .keys(dataItem)
      .filter((key: string) => {
        if (!config[key]) return acum
        const dataItemProperty = dataItem[key]
        const value = isRichDataObject(dataItemProperty)
          ? dataItemProperty.value
          : dataItemProperty
        if (acum < value) acum = Number(value)
      })
    return acum
  }, 0)

  return max
}

export default findBarsYAxisMax
