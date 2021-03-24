import { IDataItemProperty, IRichDataObject } from '../types'

const isRichDataObject = (dataItem: IDataItemProperty): dataItem is IRichDataObject =>
  (dataItem as IRichDataObject).component !== undefined || (dataItem as IRichDataObject).value !== undefined 

export default isRichDataObject
