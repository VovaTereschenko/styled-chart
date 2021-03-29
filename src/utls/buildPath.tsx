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
    const component = config[key].component || <Path />
    return (
      <React.Fragment key={key}>
        {React.cloneElement(
          component,
          {
            d,
          }
        )}
      </React.Fragment>
    )
  }
}

export default buildPath
