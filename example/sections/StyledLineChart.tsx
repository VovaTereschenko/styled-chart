import * as React from 'react'
import styled from 'styled-components'
import {
  LineChart,
  Path,
  YGrid,
  XGrid,
} from '../../src/index'

const ConversionPath = styled(Path)`
  stroke: DarkKhaki;
`

const LineChartWrapper = styled.section`
  display: flex;
  width: 100%;
`



const StyledLineChart = () => {
  return (
    <LineChartWrapper>
      <LineChart
        tooltip={{
          isVisible: true,
        }}
        yAxis={{
          grid: true,
          ticksNum: 5,
        }}
        xAxis={{
          grid: true,
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
    </LineChartWrapper>
  )
}

export default StyledLineChart
