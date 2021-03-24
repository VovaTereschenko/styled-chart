import React from 'react'

import {
  IConfig,
} from '../types'

import {
  Path,
} from '../components'

const buildPath = (
  key: string,
  config: IConfig,
  d: string,
) =>  {
  if (config[key]) {
    const component = config[key].component

    return component
      ? React.cloneElement(
        component,
        {
          d,
        }
      )
      : <Path key={key} d={d}></Path>
  }
}

export default buildPath
