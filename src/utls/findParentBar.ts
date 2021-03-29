import {
  IConfig,
} from '../types'

const findParentBar = (config: IConfig) =>
  Object.entries(config)
    .map(arr => arr[1].isParent ? arr[0] : null)
    .find(key => key && key)
  
export default findParentBar
