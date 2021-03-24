
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import './index.css';
// import { Toggle } from '../src/index'; // 👈 Change our import 
import * as React from 'react'
import styled from 'styled-components'
import {
  LineChart,
  StackedBarChart,
  Bar,
  BarGroup,
  XAxisItem,
  XAxisBarWrapper,
  XAxisWrapper,
  YAxisItem,
  YAxisWrapper,
  Path,
} from '../src/index'

const P = styled.p`
  position: absolute;
  width: 100%;
  transform: translateY(-100%);
  margin: 0;
  font-size: 22px;
  text-align: center;
`

const Wrapper = styled.section`
  margin: 72px 16px;
`

const MyBarGroup = styled(BarGroup)`
  position: relative;
  transition: 0.2s all linear;
  margin: 0 8px;
`

const ProPlanBar = styled(Bar)`
  border-top: 4px;
  background: #ceb700;
  &:hover {
    background: #a08d00;
  }
`

const BasicPlanBar = styled(Bar)`
  background: #ecd200;
  &:hover {
    background: #a08d00;
  }
`

const SpecialPlanBar = styled(Bar)`
  background: transparent;
  align-items: center;
  justify-content: center;
  border: 5px solid #ceb700;
  &:hover {
    background: #a08d00;
  }
`

const EmptyBar = styled(Bar)`
  background: #f0f0f0;
  margin: 0 8px;
`

const MyXAxisItem = styled(XAxisItem)`
  text-align: center;
  padding: 10px;
  font-weight: bold;
`

const MyXAxisBarWrapper = styled(XAxisBarWrapper)`
  border-top: 2px solid #000;
`
const MyXAxisWrapper = styled(XAxisWrapper)`
  border-top: 2px solid red;
`

const MyYAxisItem = styled(YAxisItem)`
  font-weight: bold;
`

const MyYAxisWrapper = styled(YAxisWrapper)`
  width: 40px;
  padding: 0 8px;
  margin-right: -2px;
  text-align: right;
  border-right: 2px solid #000;
`

const ProPath = styled(Path)`
  fill: #ceb700;
  stroke: #ceb700;
`

const BasicPath = styled(Path)`
  fill: #a08d00;
  stroke: #a08d00;
`


const getConversionList = (number: number, children?: any) => {
  return (
    <MyBarGroup>
      <P>{number} Hellow world 🌟</P>
      {children}
    </MyBarGroup>
  )
}

const getSpecialBasicPlan = (number: number) => 
  <SpecialPlanBar>{number}</SpecialPlanBar>

const App = () =>
  <Wrapper>
    <StackedBarChart
      yAxis={{
        // maxValue: 200,
        // minValue: 0,
        // valuesCount: 10,
        // sectionComponent: <MyYAxisWrapper />,
        // component: <MyYAxisItem />
      }}
      xAxis={{
        key: 'id',
        // step: 1,
        // sectionComponent: <MyXAxisBarWrapper />,
        // component: <MyXAxisItem />,
        // cellsNum: 22,
      }}
      config={{
        conversion: {
          label: 'Conversion',
          isParent: true
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
          component: <EmptyBar />
        },
      }}
      data={[
        {
          id: 1,
          date: '19/08',
          conversion: {
            value: 23,
            component: (children) => getConversionList(10, children),
          },
          basicPlan: 1,
          proPlan:   4,
        },
        {
          id: 2,
          date: '20/08',
          conversion: 35,
          basicPlan: 1,
          proPlan: 4,
        },
        {
          id: 3,
          date: '21/08',
          conversion: 45,
          basicPlan: {
            value: 10,
            component: () => getSpecialBasicPlan(10),
          },
          proPlan: 10,
        },
        {
          id: 4,
          date: '22/08',
          conversion: 45,
          basicPlan: 3,
          proPlan: 1,
        },
        {
          id: 5,
          date: '23/08',
          conversion: 95,
          basicPlan: 23,
          proPlan: 33,
        },
        {
          id: 6,
          date: '24/08',
          conversion: 95,
          basicPlan: 23,
        },
        // {
        //   id: 7,
        //   date: '25/08',
        //   conversion: 100,
        //   empty: 100,
        // },
      ]}
    />

<br /> <br />

    <LineChart
      yAxis={{
        // maxValue: 50,
        minValue: 0,
        valuesCount: 10,
        sectionComponent: <MyYAxisWrapper />,
        component: <MyYAxisItem />
      }}
      xAxis={{
        key: 'date',
        step: 1,
        sectionComponent: <MyXAxisWrapper />,
        component: <MyXAxisItem />,
        // cellsNum: 22,
      }}
      config={{
        conversion: {
          label: 'Conversion',
          component: <Path />,
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
          id: 1,
          date: '19/08',
          conversion: 23,
          basicPlan: 1,
          proPlan:   4,
        },
        {
          id: 2,
          date: '20/08',
          conversion: 35,
          basicPlan: 1,
          proPlan: 4,
        },
        {
          id: 3,
          date: '21/08',
          conversion: 45,
          basicPlan: 10,
          proPlan: 10,
        },
        {
          id: 4,
          date: '22/08',
          conversion: 45,
          basicPlan: 3,
          proPlan: 1,
        },
        {
          id: 5,
          date: '23/08',
          conversion: 95,
          basicPlan: 23,
          proPlan: 33,
        },
        {
          id: 6,
          date: '24/08',
          conversion: 44,
          basicPlan: 13,
          proPlan: 33,
        },
      ]}
    />
  </Wrapper> 

export default App









ReactDOM.render(<App />, document.getElementById('root'));