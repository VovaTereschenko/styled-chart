import * as React  from 'react'
import styled from 'styled-components'

import {
  LineChart,
  Path,
  TooltipWrapper,
  TooltipLabel,
  XAxisLineWrapper,
  XAxisItem,
  YAxisItem,
  HintPoint,
  YAxisWrapper,
} from '../../src/index'

const StyledLineChart = () => {

  const MyTooltip = styled(TooltipWrapper)`
    background: Black;
  
    ${TooltipLabel} {
      font-style: italic;
    }
  `

  const MyXAxisItem = styled(XAxisItem)`
    text-align: center;
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
  `

  const MyXAxisLineWrapper = styled(XAxisLineWrapper)`
    border-top: 2px solid gray;
  `

  const StarredItemText = styled.span`
    font-size: 14px;
    font-weight: 700;
  `

  const StarredLineItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
    border-left: 2px solid HotPink;
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
      background: HotPink;
      text-align: left;
      transform: translateX(-100%);
      width: 40px;
    }
  `

  const MyPointer = styled(HintPoint)<{color: string}>`
    ${({ color }) => `
      background: ${color};
    `}
  `

  const MyYAxisWrapper = styled(YAxisWrapper)`
    width: 40px;
    padding: 0 8px;
    text-align: right;
    border-right: 2px solid Gray;
  `

  const MyYAxisItem = styled(YAxisItem)`
    font-weight: bold;
  `

  const ConversionPath = styled(Path)`
    stroke: HotPink;
  `

  const ProPath = styled(Path)`
    stroke: MediumTurquoise;
    fill: MediumTurquoise;
  `

  const BasicPath = styled(Path)`
    stroke: PaleTurquoise;
    fill: PaleTurquoise;
  `
  
  const getConversionLineList = (number: number, children?: any) => {
    return (
      <StarredLineItem>
        <StarredItemText>New record!</StarredItemText>
      </StarredLineItem>
    )
  }

  return (
    <LineChart
      tooltip={{
        isVisible: true,
        component: <MyTooltip/>,
        hints: {
          basicPlan: <MyPointer color="PaleTurquoise"/>,
          proPlan: <MyPointer color="MediumTurquoise"/>,
          conversion: <MyPointer color="HotPink"/>,
        }
      }}
      yAxis={{
        maxValue: 100,
        minValue: 0,
        ticksNum: 5,
        sectionComponent: <MyYAxisWrapper />,
        component: <MyYAxisItem />
      }}
      xAxis={{
        key: 'day',
        step: 1,
        component: <MyXAxisItem />,
        sectionComponent: <MyXAxisLineWrapper />,
      }}
      config={{
        conversion: {
          label: 'Conversion',
          component: <ConversionPath />,
          isFilled: false,
        },
        basicPlan: {
          label: 'Basic plan',
          isFilled: true,
          component: <BasicPath />,
        },
        proPlan: {
          label: 'Pro plan',
          isFilled: true,
          component: <ProPath />,
        },
      }}
      data={[
        {
          date: '19/08',
          day: 'Sun',
          basicPlan: 1,
          proPlan:   4,
          conversion: 22,
        
        },
        {
          date: '20/08',
          day: 'Mon',
          conversion: 11,
          basicPlan: 1,
          proPlan: 4,
        },
        {
          date: '21/08',
          day: 'Tue',
          conversion: 15,
          basicPlan: 24,
          proPlan: 14,
        },
        {
          date: '22/08',
          day: 'Wed',
          conversion: 12,
          basicPlan: 27,
          proPlan: 11,
        },
        {
          date: '23/08',
          day: 'Thu',
          conversion: 24,
          basicPlan: 29,
          proPlan: 8,
        },
        {
          date: '24/08',
          day: 'Fri',
          conversion: 64,
          basicPlan: 90,
          proPlan: 4,
        },
        {
          date: '25/08',
          day: 'Sat',
          conversion: 45,
          basicPlan: 3,
          proPlan: 1,
        },
        {
          date: '26/08',
          day: 'Sun',
          conversion: {
            value: 95,
            component: (children) => getConversionLineList(95, children),
          },
          proPlan: 13,
          basicPlan: 23,
        },
        {
          date: '27/08',
          day: 'Mon',
          conversion: 83,
          proPlan: 13,
          basicPlan: 33,
        },
      ]}
    />
  )
}

export default StyledLineChart
