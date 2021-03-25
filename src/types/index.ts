export type IReactComponent = React.ReactElement<any, string | React.JSXElementConstructor<any>>

export interface IRichDataObject {
  value: number
  component: (children?: any) => any
  // tooltipComponent
}

export type IDataItemProperty =  string | number | IRichDataObject

export interface IDataItem {
  [key: string]: IDataItemProperty
} 

export enum ILegend {
  empty = 'empty',
  isParent = 'isParent',
  isFilled = 'isFilled'
}

export type IDataSlice = {
  [key: string]: number[]
}

export type IConfig = {
  [key: string]: {
    label: string
    [key: string]: any
    component?: IReactComponent
    isParent?: boolean
  }
}

export type IXAxis = {
  key: string
  step?: number
  ticksNum?: number
  sectionComponent?: IReactComponent
  component?: IReactComponent
}

export type IYAxis = {
  maxValue?: number
  minValue?: number
  valuesCount?: number
  sectionComponent?: IReactComponent
  component?: IReactComponent
}

export interface ITooltip {
  isVisible: boolean
  component?: IReactComponent
  innerComponents?: {
    label?: IReactComponent
    value?: IReactComponent
    list?: IReactComponent
    listItem?: IReactComponent
  }
}

export interface ITooltipData {
  dataConfigKey: string
  barIndex: number
  barValue: number
  tooltipValues: {
    label: string
    value: any
  }[]
}
