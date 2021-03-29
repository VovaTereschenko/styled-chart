import * as React from 'react'
import styled from 'styled-components'

import {
  LineChart,
  Path,
} from '../../src/index'

import {
  MyXAxisItem,
  MyXAxisLineWrapper,
  MyYAxisWrapper,
  MyYAxisItem,
  MyPointer,
} from './sharedStyledComponents'

const MyWrapper = styled.section`
  width: 100%;
`

const StarredItemText = styled.p`
  font-size: 14px;
  font-weight: 700;
`

const StarredLineItem = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  border-left: 2px solid #f66dc347;
  margin-left: -1px;
  font-size: 12px;
  border-radius: 0;
  box-sizing: border-box;
  padding: 32px 0;
  width: 100%;
  transform: translateX(50%);
  height: 100%;

  ${StarredItemText} {
    padding: 4px;
    font-size: 11px;
    background: #f66dc347;
    text-align: left;
    transform: translateX(-100%);
    width: 40px;
  }
`

const ConversionPath = styled(Path)`
 stroke: #f66dc3;
`

const ProPath = styled(Path)`
 stroke: rgb(134, 196, 255);
 fill: #86c4ff80;
`

const BasicPath = styled(Path)`
 stroke: #cfe8ff;
 fill: #cfe8ff52;
`

const ConversionPath2 = styled(Path)`
 stroke: #6f6df6;
`

const ProPath2 = styled(Path)`
 stroke: rgb(235, 226, 111);
 fill: rgb(235, 226, 111);
`

const BasicPath2 = styled(Path)`
 stroke: #cfe8ff;
 fill: #cfe8ff;
`

const ConversionPath3 = styled(Path)`
 stroke: #6f6df6;
`

const ProPath3 = styled(Path)`
 stroke: rgb(134, 196, 255);
 fill: rgb(134, 196, 255);
`

const BasicPath3 = styled(Path)`
 stroke: #f6ffcf;
 fill: #f6ffcf;
`

const StyledLineChart = () => {
  const configs = [
    {
      conversionPath: <ConversionPath />,
      proPath: <ProPath />,
      basicPath: <BasicPath />,
      index: 0,
      xAxisKey: 'day',
      yAxisMaxValue: 100,
      yAxisTicksNum: 6,
      xAxisStep: 1,
      conversion: [100, 50, 50, 50, 32, 10, 65, 50, 81, 43, 15, 14, 38, 49, 63, 14, 0, 24, 96, 90, 81, 63, 55, 14],
      basicPlan: [11, 4, 14, 33,12, 30, 44, 51, 66, 44, 14, 52, 11, 22, 14, 52, 37, 30, 44, 51, 66, 44, 14, 52],
      proPlan: [12, 4, 6, 3, 17, 1, 3, 17, 22, 12, 1, 3, 3, 4, 6, 3, 17, 1, 3, 17, 22, 12, 1, 3],

    },
    {
      conversionPath: <ConversionPath2 />,
      proPath: <ProPath2 />,
      basicPath: <BasicPath2 />,
      index: 1,
      xAxisKey: 'date',
      yAxisMaxValue: 100,
      yAxisTicksNum: 3,
      xAxisStep: 1,
      conversion: [11, 42, 52, 12, 92, 42, 23, 77, 51],
      basicPlan: [15, 21, 35, 22, 24, 34, 35, 45, 33],
      proPlan: [2, 6, 1, 22, 1, 1, 22, 11, 21],

    },
    {
      conversionPath: <ConversionPath3 />,
      proPath: <ProPath3 />,
      basicPath: <BasicPath3 />,
      index: 2,
      xAxisKey: 'day',
      yAxisMaxValue: 120,
      yAxisTicksNum: 2,
      xAxisStep: 1,
      conversion: [31, 42, 91, 12, 32, 42, 23, 77, 51],
      basicPlan: [3, 4, 6, 3, 17, 1, 3, 17, 22],
      proPlan: [6, 3, 7, 12, 2, 1, 12, 5, 6],

    }
  ]

  const dates = [
    '19/08',
    '20/08',
    '21/08',
    '22/08',
    '23/08',
    '24/08',
    '25/08',
    '26/08',
    '28/08',
    '29/08',
    '30/08',
    '31/08',
    '1/09',
    '2/09',
    '3/09',
    '4/09',
    '5/09',
    '6/09',
    '7/09',
    '8/09',
    '9/09',
    '10/09',
    '11/09',
    '12/09',
  ]

  const dafaultConfig = configs[0]
  const [config, setCongig] = React.useState(dafaultConfig)
  const startLength = 6
  const [datesLength, setDatesLength] = React.useState(startLength)

  // const restyle = () => {
  //   setDatesLength(datesLength + 1 > dates.length ? startLength : datesLength + 1)
  //   // setCongig(config.index + 1 === configs.length ?  configs[0] : configs[config.index + 1])
  // }

  const getConversionLineList = (number: number, children?: any) => {
    return (
      <StarredLineItem>
        <StarredItemText>New record!</StarredItemText>
      </StarredLineItem>
    )
  }

  const days = [
    'Sun',
    'Mo',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mo',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mo',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mo',
    'Tue',
    'Wed',
    'Thu',
  ]

  const data = dates.slice(0, datesLength).reduce((acum, item, index) => {
    const getConversion = (val: number) =>
      val === Math.max(...config.conversion.slice(0, datesLength)) ? ({
        value: val,
        component: (children) => getConversionLineList(val, children),
      }) : val
    const obj = {
      date: item,
      day: days[index],
      basicPlan: config.basicPlan[index],
      proPlan: config.proPlan[index],
      conversion: getConversion(config.conversion[index]),
    }
    acum.push(obj)
    return acum
  }, [] as any)

  return (
    <MyWrapper>
      {/* <button onClick={restyle}>Restyle!</button> */}
      <LineChart
        height="300px"
        flexure="1"
        tooltip={{
          isVisible: true,
          hints: {
            basicPlan: <MyPointer color="#b0d6fa" />,
            proPlan: <MyPointer color="rgb(113, 187, 255)" />,
            conversion: <MyPointer color="#f359bb" />,
          }
        }}
        yAxis={{
          maxValue: config.yAxisMaxValue,
          minValue: 0,
          ticksNum: config.yAxisTicksNum,
          sectionComponent: <MyYAxisWrapper />,
          component: <MyYAxisItem />
        }}
        xAxis={{
          key: config.xAxisKey,
          step: config.xAxisStep,
          component: <MyXAxisItem />,
          sectionComponent: <MyXAxisLineWrapper />,
        }}
        config={{
          conversion: {
            label: 'Conversion',
            component: config.conversionPath,
            isFilled: false,
          },
          basicPlan: {
            label: 'Basic plan',
            isFilled: true,
            component: config.basicPath,
          },
          proPlan: {
            label: 'Pro plan',
            isFilled: true,
            component: config.proPath,
          },
        }}
        data={data}
      />
    </MyWrapper>
  )
}

export default StyledLineChart
