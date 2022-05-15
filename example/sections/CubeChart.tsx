import * as React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Path,
  HintPoint,
  TooltipWrapper,
  TooltipLabel,
  TooltipValue,
  TooltipXAxisValue,
} from '../../src/index';

// That's how you style the paths for Dogs, Cats, Pets
// You can also adjust the other <path /> rules, such as stroke-dasharray
const StyledPath = styled(Path)<{
  strokeColor: string;
  strokeWidth?: number;
  fillColor?: string;
  strokeDasharray?: number;
}>`
  && {
    ${({ strokeColor, strokeWidth, fillColor, strokeDasharray }) => `
      stroke: ${strokeColor} !important;
      stroke-width: ${strokeWidth ? strokeWidth : 2}px;
      fill: ${fillColor ? fillColor : 'transparent'};
      stroke-dasharray: ${strokeDasharray ? strokeDasharray : 0}px;
    `}
  }
`;

// That's how you style the 'colored hint dots' in the tooltip
const StyledHint = styled(HintPoint)<{
  backgroundColor?: string;
  textColor?: string;
}>`
  && {
    ${({ backgroundColor }) => `
      background-color: ${backgroundColor};
    `}
  }
`;

// That's how you can style the Tooltip
const StyledTooltip = styled(TooltipWrapper)<{
  backgroundColor?: string;
  textColor?: string;
}>`
  && {
    ${({ backgroundColor, textColor }) => `
      ${backgroundColor ? `background: ${backgroundColor}` : ``};
      ${textColor ? `color: ${textColor}` : ``};
      box-shadow: 0px 1px 4px rgba(0,0,0,0.2);
    `}
    ${TooltipLabel} {
      // font-style: italic;
      margin-left: 4px;
    }
    ${TooltipValue} {
      // font-style: italic;
    }
    ${TooltipXAxisValue} {
      opacity: 0.8;
    }
    // Let's make a hint tooltip more as a line
    ${StyledHint} {
      && {
        padding-left: 4px;
        padding-right: 4px;
        border-radius: 20px;
        height: 3px;
      }
    }
  }
`;

const CHART_HEIGHT = 300;
const CHART_LINES_FLEXURE = 1;

// xAxis uses the 'weekday' as a key to prolongate the chart horizontally
// you can change it to anything you specify in the data items
// e.g. 'date'
const X_AXIS = {
  key: 'weekday',
  grid: true,
  ticksNum: 10,
};

const Y_AXIS = {
  grid: true,
  ticksNum: 6,
};

const CONFIG = {
  dogs: {
    label: 'Dogs',
    isFilled: false,
    component: (
      <StyledPath
        strokeColor="#3ab997"
        strokeDasharray={4}
        fillColor="#3ab99710"
        strokeWidth={2}
      />
    ),
  },
  cats: {
    label: 'Cats',
    isFilled: false,
    component: (
      <StyledPath strokeColor="#3a54b9" fillColor="#3a54b910" strokeWidth={2} />
    ),
  },
  pets: {
    label: 'Pets',
    isFilled: true,
    component: (
      <StyledPath strokeColor="#c8cc48" strokeWidth={2} fillColor="#c8cc4820" />
    ),
  },
};

const TOOLTIP = {
  isVisible: true,
  component: <StyledTooltip backgroundColor={'#fff'} textColor={'#000'} />,
  hints: {
    dogs: <StyledHint backgroundColor="#3ab997" />,
    cats: <StyledHint backgroundColor="#3a54b9" />,
    pets: <StyledHint backgroundColor="#c8cc48" />,
  },
};

const StyledLineChart = () => {
  // xAxis uses the 'weekday' as a key to build itself
  // you can change it to anything you want
  const data = [
    {
      weekday: '2015',
      dogs: 1,
      cats: 2,
      pets: 1,
    },
    {
      weekday: '2016',
      dogs: 6,
      cats: 3,
      pets: 1,
    },
    {
      weekday: '2017',
      dogs: 8,
      cats: 4,
      pets: 4,
    },
    {
      weekday: '2018',
      dogs: 18,
      cats: 5,
      pets: 12,
    },
    {
      weekday: '2019',
      dogs: 16,
      cats: 6,
      pets: 8,
    },
    {
      weekday: '2020',
      dogs: 30,
      cats: 7,
      pets: 24,
    },
  ];

  return (
    <LineChart
      height={CHART_HEIGHT}
      flexure={CHART_LINES_FLEXURE}
      tooltip={TOOLTIP}
      yAxis={Y_AXIS}
      xAxis={X_AXIS}
      config={CONFIG}
      data={data}
    />
  );
};

export default StyledLineChart;
