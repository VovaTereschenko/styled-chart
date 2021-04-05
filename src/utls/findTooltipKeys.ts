import { IDataItem, IConfig } from '../types'

const findTooltipKeys = (dataItem: IDataItem, config: IConfig) =>
  Object
    .keys(dataItem)
    .filter((key: string) => {
      const dataItemProperty = dataItem[key]
      if (typeof dataItemProperty !== 'undefined') {
        const isTooltipKey = config[key] && (config[key].tooltip || config[key].label)
        return Boolean(isTooltipKey)
      }
      return false
    })

export default findTooltipKeys
