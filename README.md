# Styled-chart

![logo](https://i.ibb.co/4JLjXHF/2021-03-26-23-46-52.png)

Create beautiful charts with 💅 [Styled-components](https://styled-components.com/) (or your own react components). Chart lib for React.js built with Typescript and almost no dependencies.

![LineChart example](https://i.ibb.co/kg8WjBX/2021-03-26-23-47-10.png)
![BarChart example](https://i.ibb.co/M2hFgXD/2021-03-26-23-47-19.png)


## Installation
```bash
npm intsall styled-chart --save
```

There are two basic charts which you can additionally customize: BarChart and LineChart

## BarChart basic example

```bash
import * as React from 'react'
import styled from 'styled-components'
import {
  BarChart,
  Bar,
  BarGroup,
} from 'styled-chart'

const StyledBarChart = () => {
  const MyBarGroup = styled(BarGroup)`
    margin: 0 2px;
  `

  const ProPlanBar = styled(Bar)`
    background: red;
  `

  const BasicPlanBar = styled(Bar)`
    background: green;
  `

  return (
    <BarChart
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
      ]}
    />
  )
}

export default StyledBarChart
```

## LineChart basic example 

```bash
import * as React from 'react'
import styled from 'styled-components'
import {
  LineChart,
  Path,
} from 'styled-chart'

const StyledLineChart = () => {
  const ConversionPath = styled(Path)`
    stroke: red;
  `

  const ProPath = styled(Path)`
    stroke: blue;
    fill: blue;
  `

  const BasicPath = styled(Path)`
    stroke: green;
    fill: green;
  `

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
        basicPlan: {
          label: 'Basic plan',
          isFilled: true,
          component: <BasicPath />,
        },
        proPlan: {
          label: 'Pro plan',
          isFilled: true,
          component: <ProPath />
        },
      }}
      data={[
        {
          date: '19/08',
          conversion: 5,
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
```

## Configuration

There are five entities you can configue any LineChart or BarChart with:
```bash
data # an array of { key: value }
config # visual representaion of the data keys
xAxis # specs for the horizontal line
yAxis # specs for the verticl line 
tooltip # specs for the tooltip 🤷

```

### data
```bash
{
  [key: string]: number | React.ReactComponent
}
```

Example
```bash
[
  {
    date: '15.08',
    proPlan: 7,
    basicPlan: 15,
    conversion: 22,
  },
  {
    date: '16.08',
    proPlan: 19,
    basicPlan: 12,
    conversion: 20,
  },
]
```

#### Notes:
- The order of the values effects on the relationship between paths/bars

LineChart: proPlan is in front of the basicPlan
BarChart: proPlan is before or below (in the stacked version of BarChart) proPlan
```bash
{
  basicPlan: 15,
  proPlan: 14,
}
```

- For some specific cases you can pass a component to style it

```bash
{
  basicPlan: {
    value: 90, # is equivalent of basicPlan: 90
    component: () => getSpecialBasicPlan(90), # So you can explicitly return anything instead of the default bar/path or the one which is specified by you in the config
  },
}
```

### config

Example (BarChart)
```bash
config={{
  conversion: {
    # string
    # required
    # a label which is used in the tooltip inside <TooltipLabel>
    label: 'Conversion',
    # ReactChild, required
    # a component for your bar
    # hint: you can style <Bar/> from the lib
    component: <MyConvertionBarGrop />,
    # boolean, optional
    # indicates that the other bars will be wrapped into this one
    # so you'll get stacked bar chart
    # one one isParent can be recognized
    # hint: you can style <BarGroup/> from the lib
    isParent: true, 
  },
  basicPlan: {
    label: 'Basic plan',
    # hint: for the !isFlag bar you can style <Bar/> from the lib
    component: <MyBasicPlanBar />,
  },
  proPlan: {
    label: 'Pro plan',
    component: <MyProPlanBar />,
  },
}}
```

Example (LineChart)
```bash
config={{
  conversion: {
    # string
    # required
    # a label which is used in the tooltip
    label: 'Conversion',
    # ReactChild, required
    # a component for your path, must be path tag e.g. styled.path or <path />
    # hint: you can style <Path/> from the lib
    component: <MyConvertionPath />,
    # boolean, optional
    # indicates that the <MyConvertionPath/> path is planned to be filled
    isFilled: true,
  },
  basicPlan: {
    label: 'Basic plan',
    component: <MyBasicPlanPath />,
  },
  proPlan: {
    label: 'Pro plan',
    component: <MyProPlanPath />,
  },
}}
```

If you plan to show more bars than the data.length, you can specify a component for the empty values. This empty bar should have the same width as all the other bars.

```bash
empty: {
  label: 'Empty',
  component: <MyEmptyBar />
},
```

### xAxis

```bash
xAxis={{
  # string
  # required
  # a key from the data items you want to use for the xAxis values, e.g. 'date'
  key, 
  # number, optional
  # default is 1
  # 1 means you show every xTick  e.g. | Sun | Mon | Tue | , 2 - every second | Sun | | Tue|
  step,
  # number, optional
  # default is data.length
  # explicitly sets the number of items to cut or extend the data to a particular amount
  ticksNum,
  # ReactChild, optional
  # default is <XAxisBarWrapper/> or <XAxisLineWrapper/>
  # a component for the xAxis section
  # hint: you can style <XAxisBarWrapper/> or <XAxisLineWrapper/> (for the LineChart) from the lib
  sectionComponent: <MyXAxisWrapper />,
  # ReactChild, optional
  # default is <XAxisItem/>
  # a component for the xAxis section item
  # hint: you can style <XAxisItem/> from the lib
  component: <MyXAxisItem />
}}
```


### yAxis

```bash
yAxis={{
  # number, optional
  # default is a max of all data values 
  maxValue: 100,
  # number, optional
  # default is 0
  minValue: 0,
  # number, optional
  # default is 3
  # a number a ticks you want to be shown in the yAxis
  ticksNum: config.yAxisTicksNum,
  # ReactChild, optional
  # default is <YAxisBarWrapper/> or <YAxisLineWrapper/>
  # a component for the yAxis section
  # hint: you can style <YAxisWrapper> from the lib
  sectionComponent: <MyYAxisWrapper />,
  # ReactChild, optional
  # default is <YAxisItem/>
  # a component for the yAxis section item
  # hint: you can style <YAxisItem/> from the lib
  component: <MyYAxisItem />
}}
```

### tooltip
```bash
tooltip={{
  # boolean, optional
  # indicates that you basically want a tooltip to be visible
  isVisible: true,
  # ReactChild, optional
  # default is <TooltipWrapper/>
  # a component for the tooltip
  # hint: you can also style
  # <TooltipListItem/>
  # <TooltipList/>
  # <TooltipValue/>
  # <TooltipLabel/>
  # <TooltipXAxisValue/>
  # <HintPoint />
  # as a children of your const MyTooltipWrapper = styled(TooltipWrapper)
  component: <MyTooltipWrapper />,
  # object, optional
  hints: {
    # ReactChild, optional
    # a component for the hint circle (used in the tooltip and in the LineChart paths)
    # default for the path values highlighters <HintPoint />
    # hint: you can style <HintPoint/> from the lib 
    basicPlan: <MyBasicHint/>,
    proPlan: <MyProHint/>,
    conversion: <MyConversionHint/>,
  }
}}
```

### Components you can import and style
```bash

ChartWrapper - a wrapper for any chart (you can style it in cascade of you compoent)
#const MyWrapper = style.section`
#  ${ChartWrapper} {
#    background: black;
#  }
#`
#...
#<MyWrapper>
#  <LineChart/>...
#</MyWrapper>

BarChart # chart built with bars
LineChart # chart built with paths
Bar # default for the bar 
BarGroup # default for the Bar with isParent flag
EmptyBar # default for empty values (in case you provided ticksNum in the xAxis > data.length)
XAxisItem # default for the xAxis component
XAxisBarWrapper # default for the xAxis sectionComponent of the BarChart
YAxisItem # default for the yAxis component
XAxisLineWrapper # default for the yAxis sectionComponent of the BarChart
TooltipWrapper # dafault for the tooltip compoent
# TooltipList
# TooltipListItem
# TooltipValue
# TooltipLabel
# TooltipXAxisValue
# are nested
HintPoint # default for the circle hins in tooltip and LineChart paths highlighters 
```

### Adjusted example

```bash
import * as React  from 'react'
import styled from 'styled-components'
import {
  BarChart,
  Bar,
  BarGroup,
  TooltipWrapper,
  EmptyBar,
  ChartWrapper,
  XAxisItem,
  XAxisBarWrapper,
  YAxisWrapper,
  YAxisItem,
} from 'styled-chart'

const StyledBarChart = () => {
  const MyWrapper = styled.section`
    ${ChartWrapper} {
      height: 270px;
    }
  `

  const MyXAxisItem = styled(XAxisItem)`
    text-align: center;
    padding: 10px;
    font-size: 14px;
    color: black;
    font-weight: bold;
  `

  const MyXAxisBarWrapper = styled(XAxisBarWrapper)`
    border-top: 2px solid gray;
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

  const MyYAxisWrapper = styled(YAxisWrapper)`
    width: 40px;
    padding: 0 8px;
    text-align: right;
    border-right: 2px solid gray;
  `

  const MyYAxisItem = styled(YAxisItem)`
    font-weight: bold;
  `

  const MyTooltipWrapper = styled(TooltipWrapper)`
    background: azure;
    color: black; 
  `

  const MyBarGroup = styled(BarGroup)`
    position: relative;
    transition: 0.2s all linear;
    margin: 0 2px;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
  `

  const ProPlanBar = styled(Bar)`
    border-top: 2px solid white;
    background: blanchedalmond;
  `

  const MyEmptyBar = styled(EmptyBar)`
    margin: 0 2px;
    background: azure;
  `

  const BasicPlanBar = styled(Bar)`
    background: ghostwhite;
  `

  const SpecialPlanBar = styled(BasicPlanBar)`
    align-items: center;
    justify-content: center;
    color: black;
    font-size:24px;
  `

  const getSpecialBasicPlan = (number: number) => 
    <SpecialPlanBar>
      <StarredItemText>{number}</StarredItemText>
    </SpecialPlanBar>

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
        tooltip={{
          isVisible: true,
          component: <MyTooltipWrapper />,
        }}
        yAxis={{
          maxValue: 100,
          ticksNum: 5,
          sectionComponent: <MyYAxisWrapper />,
          component: <MyYAxisItem />
        }}
        xAxis={{
          key: 'date',
          step: 2,
          sectionComponent: <MyXAxisBarWrapper />,
          component: <MyXAxisItem />,
          ticksNum: 7,
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
            conversion: 64,
            basicPlan: {
              value: 90,
              component: () => getSpecialBasicPlan(90),
            },
            proPlan: 4,
          },
          {
            date: '22/08',
            conversion: {
              value: 95,
              component: (children) => getConversionList(95, children),
            },
            basicPlan: 23,
            proPlan: 13,
          },
        ]}
      />
    </MyWrapper>
  )
}

export default StyledBarChart
```
