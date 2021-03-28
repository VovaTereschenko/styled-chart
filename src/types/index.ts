export type IReactComponent = React.ReactElement<any, string | React.JSXElementConstructor<any>>

export interface IRichDataObject {
  value: number
  component: (children?: any) => any
  // tooltipComponent
}

export type IDataItemProperty =  string | number | IRichDataObject

interface WithUIDs {
  dataItemUID: string
}

export interface INotUniqueDataItem {
  [key: string]: IDataItemProperty
}

export interface IDataItem extends WithUIDs {
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
    denoteAs?: string
    isParent?: boolean
    flexure?: string | number
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
  ticksNum?: number
  denoteAs?: string 
  sectionComponent?: IReactComponent
  component?: IReactComponent
}

export interface ITooltip {
  isSmartTooltipPositioning?: boolean
  isVisible?: boolean
  hints?: {
    [key: string]: IReactComponent
  }
  component?: IReactComponent
  innerComponents?: {
    label?: IReactComponent
    value?: IReactComponent
    list?: IReactComponent
    listItem?: IReactComponent
  }
}

export interface ITooltipData {
  xAxisValue: IDataItemProperty
  dataConfigKey: string
  barIndex: number
  barValue: number
  tooltipValues: {
    label: string
    key: string
    value: any
  }[]
}
