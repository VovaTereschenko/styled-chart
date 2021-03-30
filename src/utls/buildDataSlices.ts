import { IConfig, IDataItem, IDataSlice } from '../types'
import { isRichDataObject, findInnerComponentsKeys } from './'

/**
 * @example {
 *    x: [1, 2, 3],
 *    y: [2, 0, 1],
 * }
 */
const buildDataSlices = (uiniqueKeysData: IDataItem[], config: IConfig) => {
  const keys = uiniqueKeysData.map((item) => findInnerComponentsKeys(item, config))

  /**
   * @example {
   *    [x, y]
   * }
   */
  const uniqueKeys = keys.reduce((acum, item) => {
    const uniqueIterationKeys = item.filter(key => acum.indexOf(key) === -1)
    return [...acum, ...uniqueIterationKeys]
  }, [])


  /**
   * @example {
   *    x: [1, 2, 3],
   *    y: [2, 0, 1],
   * }
   */
  const dataSlices = uiniqueKeysData.reduce((acum, dataItem) => {
    uniqueKeys.forEach((key) => {
      if (!acum[key]) acum[key] = []
      const dataItemProperty = dataItem[key]

      if (typeof dataItemProperty !== undefined) {
        const value = isRichDataObject(dataItemProperty)
          ? Number(dataItemProperty.value)
          : Number(dataItemProperty)
        acum[key].push(value)
      }
    
    })
    return acum
  }, {} as IDataSlice)

  return dataSlices
}

export default buildDataSlices
