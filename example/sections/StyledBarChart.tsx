import * as React  from 'react'
import styled from 'styled-components'
import {
  BarChart,
  Bar,
  BarGroup,
  TooltipWrapper,
  EmptyBar,
  ChartWrapper,
} from '../../src/index'

import {
  MyXAxisItem,
  MyXAxisBarWrapper,
  StarredItem,
  StarredItemEmoji,
  MyYAxisWrapper,
  MyYAxisItem,
} from './sharedStyledComponents'


const MyWrapper = styled.section`
  ${TooltipWrapper} {
    background: #cfcfcf;
    color: #333; 
  }
`

const StarredItemText = styled.span`
  font-size: 14px;
  font-weight: 700;
`

const MyBarGroup = styled(BarGroup)`
  position: relative;
  transition: 0.2s all linear;
  margin: 0 2px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
`

const ProPlanBar = styled(Bar)`
  border-top: 2px solid #fff;
  background: #ecddb4;
`

const MyEmptyBar = styled(EmptyBar)`
  margin: 0 2px;
  background: #f7f7f7;
`

const BasicPlanBar = styled(Bar)`
background:#FBEECA;
`

const SpecialPlanBar = styled(BasicPlanBar)`
  align-items: center;
  justify-content: center;
  color: #000;
  font-size:24px;
`

const getSpecialBasicPlan = (number: number) => 
  <SpecialPlanBar>
    <StarredItemText>{number}</StarredItemText>
  </SpecialPlanBar>

const StyledBarChart = () => {

  const getConversionList = (number: number, children?: any) => {
    return (
      <MyBarGroup>
        <StarredItem>
          <StarredItemEmoji>🌟</StarredItemEmoji>
          <StarredItemText>{number}</StarredItemText>
        </StarredItem>
        {children}
      </MyBarGroup>
    )
  }

  return (
    <MyWrapper>
      <BarChart
        height="300px"
        tooltip={{
          isVisible: true,
        }}
        yAxis={{
          maxValue: 100,
          denoteAs: '%',
          ticksNum: 5,
          sectionComponent: <MyYAxisWrapper />,
          component: <MyYAxisItem />
        }}
        xAxis={{
          key: 'date',
          step: 2,
          sectionComponent: <MyXAxisBarWrapper />,
          component: <MyXAxisItem />,
        }}
        config={{
          conversion: {
            label: 'Conversion',
            isParent: true,
            denoteAs: '%',
            component: <MyBarGroup />,
          },
          basicPlan: {
            label: 'Basic plan',
            component: <BasicPlanBar />,
          },
          proPlan: {
            label: 'Pro plan',
            component: <ProPlanBar />
          },
          empty: {
            label: 'Empty',
            component: <MyEmptyBar />
          },
        }}
        data={[
          {
            date: '19/08',
            conversion: 22,
            basicPlan: 1,
            proPlan:   4,
          },
          {
            date: '20/08',
            conversion: 11,
            basicPlan: 1,
            proPlan: 4,
          },
          {
            date: '21/08',
            conversion: 15,
            basicPlan: 24,
            proPlan: 14,
          },
          {
            date: '22/08',
            conversion: 12,
            basicPlan: 27,
            proPlan: 11,
          },
          {
            date: '23/08',
            conversion: 24,
            basicPlan: 29,
            proPlan: 8,
          },
          {
            date: '24/08',
            conversion: 64,
            basicPlan: {
              value: 90,
              component: () => getSpecialBasicPlan(90),
            },
            proPlan: 4,
          },
          {
            date: '25/08',
            conversion: 45,
            basicPlan: 3,
            proPlan: 1,
          },
          {
            date: '26/08',
            conversion: {
              value: 95,
              component: (children) => getConversionList(95, children),
            },
            basicPlan: 23,
            proPlan: 13,
          },
          {
            date: '27/08',
            conversion: 83,
            basicPlan: 23,
            proPlan: 13,
          },
        ]}
      />
    </MyWrapper>
  )
}

export default StyledBarChart
