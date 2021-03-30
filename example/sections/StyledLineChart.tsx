import * as React from 'react'
import styled from 'styled-components'
import {
  LineChart,
  Path,
} from '../../src/index'

const ConversionPath = styled(Path)`
  stroke: DarkKhaki;
`

const ProPath = styled(Path)`
  stroke: Khaki;
  fill: Khaki;
`

const BasicPath = styled(Path)`
  stroke: LemonChiffon;
  fill: LemonChiffon;
`

const StyledLineChart = () => {
  return (
    
    <LineChart
      tooltip={{
        isVisible: true,
      }}
      yAxis={{
        ticksNum: 5,
      }}
      xAxis={{
        key: 'date',
      }}
      config={{
        conversion: {
          label: 'Conversion',
          component: <ConversionPath />,
        },
      }}
      data={[
        {
          date: '19/08',
          conversion: 0,
          basicPlan: 3,
          proPlan: 1,
        },
        {
          date: '20/08',
          conversion: 7,
          basicPlan: 2,
          proPlan: 3,
        },
        {
          date: '20/08',
          conversion: 11,
          basicPlan: 3,
          proPlan: 1,
        },
      ]}
    />
  )
}

export default StyledLineChart
