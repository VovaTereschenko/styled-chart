# Styled-chart


 <img src="https://i.ibb.co/4JLjXHF/2021-03-26-23-46-52.png" width="150" title="Logo">


Create beautiful charts with 💅 [Styled-components](https://styled-components.com/) (or your own react components). Chart lib for React.js built with Typescript and almost no dependencies.

Live examples on https://styled-chart.com/.

Questions, suggestions? Contact developer: [vovatdev@gmail.com](mailto:vovatdev@gmail.com)

<div>
  <img src="https://i.ibb.co/kg8WjBX/2021-03-26-23-47-10.png" width="380" title="LineChart example">
  <img src="https://i.ibb.co/Ny3RxNW/2021-03-28-17-03-45.png" width="380" alt="BarChart example">
</div>



## Installation
```bash
npm install styled-chart --save
```

There are two basic charts which you can customize: BarChart and LineChart


## Examples

### BarChart basic example


<img src="https://i.ibb.co/ykPStTb/2021-03-27-0-32-30.png" width="380" title="Basic BarChart">


```javascript
import * as React from 'react'
import styled from 'styled-components'
import {
  BarChart,
  BarGroup,
} from 'styled-chart'

const ProPlanBar = styled(BarGroup)`
  background: DarkKhaki;
`

const BasicPlanBar = styled(BarGroup)`
  background: Khaki;
`

const StyledBarChart = () => {
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
          basicPlan: 1,
          proPlan:   4,
        },
        {
          date: '20/08',
          basicPlan: 1,
          proPlan: 4,
        },
      ]}
    />
  )
}

export default StyledBarChart
```






### Stacked BarChart basic example

<img src="https://i.ibb.co/Kxt7TjF/2021-03-26-23-57-01.png" width="380" title="Basic BarChart">



<details>
<summary><span style="color:DodgerBlue;">Show Stacked BarChart example code</span></summary>
<p>

```javascript
import * as React from 'react'
import styled from 'styled-components'
import {
  BarChart,
  Bar,
  BarGroup,
} from 'styled-chart'

const MyBarGroup = styled(BarGroup)`
  margin: 0 2px;
`

const ProPlanBar = styled(Bar)`
  background: DarkKhaki;
`

const BasicPlanBar = styled(Bar)`
  background: Khaki;
`

const StyledStackedBarChart = () => {

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

export default StyledStackedBarChart
```

</p>
</details>  






### LineChart basic example 

<img src="https://i.ibb.co/YtLwV7w/2021-03-27-0-00-40.png" width="380" title="Basic LineChart">


<details>
<summary><span style="color:DodgerBlue;">Show LineChart example code</span></summary>
<p>

```javascript
import * as React from 'react'
import styled from 'styled-components'
import {
  LineChart,
  Path,
} from 'styled-chart'

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
</p>
</details>  




## Configuration

There are five entities you can configue any LineChart or BarChart with:
```javascript
// {[key: string]: number | object}[]
// required
// your chart data
data 
// object
// required
// data keys visual config
config
// object
// required
// horizontal line visual config
xAxis
// object
// required
// vertical line visual config
yAxis 
// object
// optional
// config for the tooltip 🤷
tooltip
// number | string
// optional
// height of the chart
height
```

LineChart only
```javascript
// number from 0 to 100
// optional
// sets the flexure of the lines
// (can be adjusted pointwise in the config)
flexure
// any[]
// optional
// if this changes, chart will resize 
// (in case other DOM element pushes it)
resizeDependency 
```

### data
```javascript
{
  [key: string]: number | React.ReactComponent
}
```

Example
```javascript
data={[
  {
    date: '15.08', // will be used for xAxis values
    proPlan: 7, // the rest will be used to create bars/paths
    basicPlan: 15,
    conversion: 22,
  },
  {
    date: '16.08',
    proPlan: 19,
    basicPlan: 12,
    conversion: 20,
  },
]}
```

#### Notes:
- The order of the values effects on the relationship between paths/bars

LineChart: proPlan is in front of the basicPlan

BarChart: proPlan is before or below (in the stacked version of BarChart) proPlan
```javascript
{
  basicPlan: 15,
  proPlan: 14,
}
```

- For some specific cases you can pass a component to be able to customize it

```javascript
{
  basicPlan: {
    // is equivalent of basicPlan: 90
    value: 90, 
    // provide the function to get the layout
    // so you can explicitly return anything instead of 
    // the default bar/path or the one which is specified by you in the config
    component: () => getSpecialBasicPlan(90), 
  },
}
```

- For the isParent bars you need to pass children (inner bars). Check out more in the adjusted examples below.

```javascript
{
  conversion: {
    value: 90, 
    // provide the function to get the inner layout
    // so you can explicitly return anything instead of 
    // the default component or the one specified by you in the config
    component: (children) => getConversionLineList(90 children),
  },
}

// don't forget to add inner bars (children)
const getConversionLineList = (number: number, children: any) => {
  return (
    <MyBarGroup>
      <StarredItemText>New record!</StarredItemText>
      {children}
    </MyBarGroup>
  )
}
```

### config

BarChart
```javascript
config={{
  conversion: {
    // string
    // required
    // a label which is used in the tooltip inside <TooltipLabel/>
    label: 'Conversion',
    // ReactChild | JSX Element
    // default is <BarGroup/>
    // required
    // a component for your bar
    // hint: you can style <Bar/> from the lib
    component: <MyConvertionBarGroup />,
    // string
    // default is ''
    // optional
    // denotation of values
    denoteAs: '%',
    // boolean, optional
    // default is false
    // indicates that the other bars will be wrapped into this one
    // so you'll get stacked bar chart
    // only a single isParent can be recognized (all the others will be ignored)
    // hint: you can style <BarGroup/> from the lib
    isParent: true, 
  },
  basicPlan: {
    label: 'Basic plan',
    // hint: for the !isFlag bar you can style <Bar/> from the lib
    component: <MyBasicPlanBar />,
  },
  proPlan: {
    label: 'Pro plan',
    component: <MyProPlanBar />,
  },
}}
```

LineChart
```javascript
config={{
  conversion: {
    // string
    // required
    // a label which is used in the tooltip
    label: 'Conversion',
    // ReactChild | JSX.Element
    // default is <Path/>
    // required (otherwise it doesn't make sense)
    // a component for your path, must be path tag e.g. styled.path or <path />
    // hint: you can style <Path/> from the lib
    component: <MyConvertionPath />,
    // string
    // default is ''
    // optional
    // denotation of values
    denoteAs: '%',
    // number from 0 to 100
    // default is 20
    // optional
    // sets the flexure of the line
    flexure: 0,
    // boolean, optional
    // default is false
    // indicates that the <MyConvertionPath/> path is planned to be filled
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

```javascript
empty: {
  label: 'Empty',
  component: <MyEmptyBar />
},
```

### xAxis

```javascript
xAxis={{
  // string
  // required
  // a key from the data items you want to use for the xAxis values, e.g. 'date'
  key: 'date', 
  // number, optional
  // default is 1
  // 1 means you show every xTick
  // example:
  // 1 -> | Sun | Mon | Tue | Wed |
  // 2 -> | Sun | x | Tue |
  // 3 -> | Sun | x | x | Wed |
  step: 3,
  // boolean | ReactChild | JSX.Element, optional
  // default is false
  // adds xAxis grid to the chart
  grid: true,
  // number, optional
  // default is data.length
  // explicitly sets the number of items to cut or extend the data to a particular amount
  ticksNum: 5,
  // ReactChild | JSX.Element, optional
  // default is <XAxisBarWrapper/> or <XAxisLineWrapper/>
  // a component for the xAxis section
  // hint: you can style <XAxisBarWrapper/> or <XAxisLineWrapper/> (for the LineChart) from the lib
  sectionComponent: <MyXAxisWrapper />,
  // ReactChild | JSX.Element, optional
  // default is <XAxisItem/>
  // a component for the xAxis section item
  // hint: you can style <XAxisItem/> from the lib
  component: <MyXAxisItem />
}}
```


### yAxis

```javascript
yAxis={{
  // number, optional
  // default is a max of all data values 
  maxValue: 100,
  // number, optional
  // default is 0
  minValue: 0,
  // string, optional
  // denotation of values
  denoteAs: '%',
  // boolean | ReactChild | JSX.Element, optional
  // default is false
  // adds xAxis grid to the chart
  grid: true,
  // number, optional
  // default is 3
  // a number a ticks you want to be shown in the yAxis
  ticksNum: 5,
  // ReactChild | JSX.Element, optional
  // default is <YAxisBarWrapper/> or <YAxisLineWrapper/>
  // a component for the yAxis section
  // hint: you can style <YAxisWrapper> from the lib
  sectionComponent: <MyYAxisWrapper />,
  // ReactChild | JSX.Element, optional
  // default is <YAxisItem/>
  // a component for the yAxis section item
  // hint: you can style <YAxisItem/> from the lib
  component: <MyYAxisItem />
}}
```

### tooltip
```javascript
tooltip={{
  // boolean, optional
  // default is false
  // indicates that you basically want a tooltip to be visible
  isVisible: true,
  // boolean, optional
  // default is true
  // you can turn it off if you want it to appear about the bars/lines
  isSmartTooltipPositioning: false,
  // ReactChild | JSX.Element, optional
  // default is <TooltipWrapper/>
  // a component for the tooltip
  // hint: you can also style
  // <TooltipListItem/>
  // <TooltipList/>
  // <TooltipValue/>
  // <TooltipLabel/>
  // <TooltipXAxisValue/>
  // <HintPoint />
  // as a children of your const MyTooltipWrapper = styled(TooltipWrapper)
  component: <MyTooltipWrapper />,
  // object, optional
  hints: {
    // ReactChild | JSX.Element, optional
    // a component for the hint circle (used in the tooltip and in the LineChart paths)
    // default for the path values highlighters <HintPoint />
    // hint: you can style <HintPoint/> from the lib 
    basicPlan: <MyBasicHint/>,
    proPlan: <MyProHint/>,
    conversion: <MyConversionHint/>,
  }
}}
```


### height
```javascript
// string | number
// if number, will count in px
// default is 300px
height="400px"
```


### resizeDependency
```javascript
// any array
// optional
// example:
// if user opens a drawer UI element on your site, the chart has to resize 
resizeDependency={[drawerIsOpen]}
```


## Components you can import and style
```javascript

// ----------
// charts:
// ----------
// chart built with bars
<BarChart/> 
// chart built with 'lines' (paths)
<LineChart/> 

// ----------
// bars:
// ----------
// default for the bar
<Bar/> 
// default for the Bar with isParent flag
<BarGroup/> 
 // default for empty values
 // (in case you provided ticksNum in the xAxis > data.length)
 // you can style one if provide 'empty' key in config
 // e.g. empty: <MyEmptyBar>
<EmptyBar/>

// ----------
// xAxis:
// ----------
// default for the xAxis component
<XAxisItem /> 
// default for the xAxis sectionComponent of the BarChart
<XAxisBarWrapper/> 

// ----------
// yAxis:
// ----------
// default for the yAxis component
<YAxisItem/>
// default for the yAxis sectionComponent of the LineChart
<XAxisLineWrapper/> 

// ----------
// tooltip:
// ----------
// dafault for the tooltip component
<TooltipWrapper/> 
// inside TooltipWrapper:
// list of the ticks
<TooltipList/> 
<TooltipListItem/>
// to separate and style the value
<TooltipValue/>
// to separate and style the label
<TooltipLabel/>
// to style the related TooltipXAxisValue
<TooltipXAxisValue/> 
// HintPoint is also included here
// so you can style the label's colored 'hint dots' 
// it appears here only if you specify it explicitly
// see tooltip config
<HintPoint/>

// ----------
// SVG related:
// ----------
// Wrapper for the LineChart's 'lines' (paths)
<SVG/>
// default for the paths in LineChart
<Path/> 

// ----------
// invisible elements:
// ----------
// overlay of the LineChart
// is used for better interactions with tooltip 
// or to explicitly wrapper children and not mess with
// SVG's foreignItem
<InvisibleBarSection/> 
// inside InvisibleBarSection:
<InvisibleBar/> 
<InvisibleBarGroup/> 

// ----------
// wrappers:
// ----------
// a wrapper for any chart
<ChartWrapper/>
// a wrapper for the 'visual' content (bar groups / svg)
<ChartVisualsWrapper/> 
 // a wrapper for any chart visual content and xAxis
<ChartWithXAxisWrapper/>

// ----------
// other:
// ----------
// default for the 'colored circle hints'
// in tooltip and LineChart's 'path highlighters'
<HintPoint/> 
```



## More examples

### Adjusted BarChart example

<img src="https://i.ibb.co/vLQbCD8/2021-03-27-0-05-38.png" width="380" title="Adjusted BarChart">

<details>
<summary><span style="color:DodgerBlue;">Show  Adjusted BarChart example code</span></summary>
<p>

```javascript
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

const MyWrapper = styled.section`
  // That's how use can "force" rules (in cascade)
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  padding: 16px 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgb(248, 182, 195) 100%);
  text-align: center;
  font-size: 12px;
  border-radius: 5px;
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
  background: OldLace;
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
  background: Plum;
`

const MyEmptyBar = styled(EmptyBar)`
  margin: 0 2px;
  background: WhiteSmoke;
`

const BasicPlanBar = styled(Bar)`
  background: Pink;
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

const StyledBarChart = () => {
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

</p>
</details>  





### Adjusted LineChart example

<img src="https://i.ibb.co/LC1tv93/2021-03-27-0-24-22.png" width="380" title="Adjusted BarChart">


<details>
<summary><span style="color:DodgerBlue;">Show Adjusted LineChart example code</span></summary>
<p>

```javascript
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
} from 'styled-chart'

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

const getConversionLineList = () =>
  <StarredLineItem>
    <StarredItemText>New record!</StarredItemText>
  </StarredLineItem>
}

const StyledLineChart = () => {

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
          proPlan: 4,
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
            component: () => getConversionLineList(),
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
```

</p>
</details>  

### Styling in cascade
To access all the elements of the Chart, use the cascade styling. This is handy if something goes wrong with direct styling.

```javascript
import {
  LineChart,
  BarChart,
  TooltipWrapper,
} from 'styled-chart'

const MyWrapper = styled.section`
  ${TooltipWrapper} {
    background: #cfcfcf;
    color: #333; 
  }
`
// ... Inside your react component ->
// Wrap the chart into your styled wrapper
return (
  <MyWrapper>
    <LineChart />
    <BarChart />
  </MyWrapper>
)
```
</p>
</details>  
