export type IReactComponent = React.ReactElement<any, string | React.JSXElementConstructor<any>>

export interface IRichDataObject {
  value: number
  component: (children?: any) => any
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
  cellsNum?: number
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
