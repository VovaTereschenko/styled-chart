import * as React  from 'react'
import styled from 'styled-components'
import {
  StackedBarChart,
  Bar,
  BarGroup,
  XAxisItem,
  XAxisBarWrapper,
  XAxisLineWrapper,
  YAxisItem,
  YAxisWrapper,
  TooltipWrapper,
  TooltipListItem,
  LineChart,
  Path,
  EmptyBar,
} from '../../src/index'


const P = styled.p`
  position: absolute;
  width: 100%;
  transform: translateY(-100%);
  margin: 0;
  font-size: 22px;
  text-align: center;
`

const ChartWrapper = styled.div`
 width: 50%;
 margin: 8px;
`

const BasicChartsWrapper = styled.section`
  display: flex;
  margin: 32px auto;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  @media (max-width: 767px) {
    flex-wrap: wrap;
    ${ChartWrapper} {
      width: 100%;
      margin: 0;
    }
  }
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

const MyBarGroup = styled(BarGroup)`
  position: relative;
  transition: 0.2s all linear;
  margin: 0 2px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
`

const MyXAxisItem = styled(XAxisItem)`
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #303030;
  font-weight: bold;
`

const MyYAxisItem = styled(YAxisItem)`
  font-weight: bold;
`

const MyYAxisWrapper = styled(YAxisWrapper)`
  width: 40px;
  padding: 0 8px;
  text-align: right;
  border-right: 2px solid #757575;
`

const MyXAxisBarWrapper = styled(XAxisBarWrapper)`
  border-top: 2px solid #757575;
`

const MyXAxisLineWrapper = styled(XAxisLineWrapper)`
  border-top: 2px solid #757575;
`

const MyTooltipWrapper = styled(TooltipWrapper)`
  ${TooltipListItem} {
    // background: red;
  }
`

const StarredItemText = styled.span`
  font-size: 14px;
  font-weight: 700;
`

const StarredItemEmoji = styled.span`
  font-size: 24px;
`

const StarredItem = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgb(248, 182, 195) 100%);
  text-align: center;
  font-size: 12px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 16px 0;
  width: 100%;
  height: 100%;
`

const StarredLineItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgb(248, 182, 195) 100%);
  text-align: center;
  font-size: 12px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 16px 0;
  width: 100%;
  height: 100%;
`

const ConversionPath = styled(Path)`
 stroke: #f66dc3;
`

const ProPath = styled(Path)`
  stroke: rgb(134, 196, 255);
  fill: rgb(134, 196, 255);
`

const BasicPath = styled(Path)`
  stroke: #cfe8ff;
  fill: #cfe8ff;
`


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

const getConversionLineList = (number: number, children?: any) => {
  return (
    <StarredLineItem>
      <StarredItemEmoji>🌟</StarredItemEmoji>
      <StarredItemText>{number}</StarredItemText>
    </StarredLineItem>
  )
}

const getSpecialBasicPlan = (number: number) => 
  <SpecialPlanBar>
    <StarredItemText>{number}</StarredItemText>
  </SpecialPlanBar>


const BasicCharts = () =>
  <BasicChartsWrapper>
    <ChartWrapper>
      <LineChart
        tooltip={{
          isVisible: true,
          component: <MyTooltipWrapper />,
        }}
        yAxis={{
          // maxValue: 50,
          minValue: 0,
          valuesCount: 10,
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
    </ChartWrapper>
    <ChartWrapper>
    <StackedBarChart
        tooltip={{
          isVisible: true,
          component: <MyTooltipWrapper />,
        }}
        yAxis={{
          maxValue: 100,
          // minValue: 0,
          valuesCount: 5,
          sectionComponent: <MyYAxisWrapper />,
          component: <MyYAxisItem />
        }}
        xAxis={{
          key: 'date',
          step: 2, // не работает, если нету component
          sectionComponent: <MyXAxisBarWrapper />,
          component: <MyXAxisItem />,
          // ticksNum: 12,
        }}
        config={{
          conversion: {
            label: 'Conversion',
            isParent: true,
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
    </ChartWrapper>
  </BasicChartsWrapper>

export default BasicCharts

