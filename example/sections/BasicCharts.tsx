import * as React from 'react'
import styled from 'styled-components'
import {
  BarChart,
  BarGroup,
  Bar,
  HintPoint,
  TooltipWrapper,
  TooltipLabel,
  TooltipValue,
  TooltipXAxisValue,
} from '../../src/index'
  
// That's how you style the bars e.g. Dogs, Cats
const StyledBar = styled(Bar)<{backgroundColor: string}>`
    && {
      ${({ backgroundColor }) => `
        background-color: ${backgroundColor};
      `}
    }
  `
// That's how you style the "parent" bar Pets
const StyledBarGroup = styled(BarGroup)`
    && {
      margin: 0 4px;
    }
  `
// That's how you can style the Tooltip
const StyledTooltip = styled(TooltipWrapper)<{backgroundColor?: string, textColor?: string}>`
    && {
      ${({ backgroundColor, textColor }) => `
        ${backgroundColor ? `background: ${backgroundColor}` : ''};
        ${textColor ? `color: ${textColor}` : ''};
      `}
      ${TooltipLabel} {
        font-style: italic;
      }
      ${TooltipValue} {
        font-style: italic;
      }
      ${TooltipXAxisValue} {
        opacity: 0.8;
      }
    }
  `
// That's how you style the 'colored hint dots' in the tooltip
const StyledHint = styled(HintPoint)<{backgroundColor: string}>`
    && {
      ${({ backgroundColor }) => `
        background-color: ${backgroundColor};
      `}
    }
  `
const CHART_HEIGHT = 300
  
// xAxis uses the 'weekday' as a key to prolongate the chart horizontally
// you can change it to anything you specify in the data items
// e.g. 'date'
const X_AXIS = {
  key: 'weekday',
  grid: true,
}
  
const Y_AXIS = {
  grid: true,
}
  
const CONFIG = {
  'dogs': {
    label: 'Dogs',
    isParent: false,
    component: (
      <StyledBar 
        backgroundColor="#3ab997"
      />
    ),
  },
  'cats': {
    label: 'Cats',
    isParent: false,
    component: (
      <StyledBar 
        backgroundColor="#3a54b9"
      />
    ),
  },
  'pets': {
    label: 'Pets',
    isParent: true,
    component: <StyledBarGroup />,
  },
      
}
  
const TOOLTIP = {
  isVisible: true,
  component: (
    <StyledTooltip />
  ),
  hints: {
    'dogs': <StyledHint backgroundColor='#3ab997' />,
    'cats': <StyledHint backgroundColor='#3a54b9' />,
    'pets': <StyledHint backgroundColor='#c8cc48' />,
        
  },
}
  
  
const BasicCharts = () => {

  const [ selectionInterval, setSelectionInterval] = React.useState([])
  // xAxis uses the 'weekday' as a key to build itself
  // you can change it to anything you want
  const data = [
    {
      weekday: 'Sun',
      'dogs': 1,
      'cats': 2,
      'pets': 1,
    },
    {
      weekday: 'Mon',
      'dogs': 6,
      'cats': 3,
      'pets': 1,
    },
    {
      weekday: 'Tue',
      'dogs': 8,
      'cats': 4,
      'pets': 4,
    },
    {
      weekday: 'Wed',
      'dogs': 18,
      'cats': 5,
      'pets': 12,
    },
    {
      weekday: 'Thu',
      'dogs': 16,
      'cats': 6,
      'pets': 8,
    },
    {
      weekday: 'Fri',
      'dogs': 30,
      'cats': 7,
      'pets': 24,
    },
    {
      weekday: 'Sat',
      'dogs': 24,
      'cats': 8,
      'pets': 12,
    },
        
  ]
  
  return (
    <BarChart
      height={CHART_HEIGHT}
      tooltip={TOOLTIP}
      yAxis={Y_AXIS}
      xAxis={X_AXIS}
      config={CONFIG}
      data={data}
      selection={{
        selectionInterval,
        setSelectionInterval,
        selectionHighlighter: 'red'
      }}
    />
  )
}
    
export default BasicCharts
  