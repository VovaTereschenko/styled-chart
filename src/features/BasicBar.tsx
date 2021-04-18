import * as React from 'react'

import {
  BarGroup,
} from '../components'

import {
  IConfig,
  IDataItem,
  IDataItemProperty,
} from '../types'

import {
  isRichDataObject,
  getInnerBarHeight,
} from '../utls'

interface IBasicChart {
  dataConfigKey: string,
  dataItem: IDataItem,
  dataItemProp: IDataItemProperty,
  config: IConfig,
  innerSum: number,
  minYValue: number,
}

const BasicBar = ({
  dataConfigKey,
  dataItem,
  dataItemProp,
  config,
  innerSum,
  minYValue,
}: IBasicChart) => {
  const component = isRichDataObject(dataItemProp)
    ? dataItemProp.component() // we take the compoent right from the data item
    : config[dataConfigKey].component // we take the component from the config
  || <BarGroup /> // or we take the default one

  const value = isRichDataObject(dataItemProp)
    ? dataItemProp.value
    : dataItemProp

  const componentProps = {
    style: {
      height: getInnerBarHeight(Number(value), innerSum, minYValue),
    },
  }

  return (
    <React.Fragment key={`inner_${dataItem.dataItemUID}_${dataConfigKey}`}>
      {React.cloneElement(
        component,
        componentProps,
      )}
    </React.Fragment>
  )
}

export default BasicBar
