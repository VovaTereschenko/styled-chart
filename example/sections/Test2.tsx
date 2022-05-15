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

// That's how you style the paths for Dogs, Cats, Pets, Alpacas
// You can also adjust the other <path /> rules, such as stroke-dasharray
const StyledPath = styled(Path)<{
  strokeColor: string;
  strokeWidth?: number;
  fillColor?: string;
}>`
  && {
    ${({ strokeColor, strokeWidth, fillColor }) => `
      stroke: ${strokeColor} !important;
      stroke-width: ${strokeWidth ? strokeWidth : 2}px;
      fill: ${fillColor ? fillColor : 'transparent'};
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
};

const Y_AXIS = {
  maxValue: 66184.8267,
  minValue: 1727,
  ticksNum: 6,
  grid: true,
};

const CONFIG = {
  dogs: {
    label: 'Dogs',
    isFilled: false,
    component: <StyledPath strokeColor="#3ab997" strokeWidth={2} />,
  },
  cats: {
    label: 'Cats',
    isFilled: false,
    component: <StyledPath strokeColor="#3a54b9" strokeWidth={2} />,
  },
  pets: {
    label: 'Pets',
    isFilled: true,
    component: (
      <StyledPath strokeColor="#c8cc48" strokeWidth={4} fillColor="#c8cc4820" />
    ),
  },
  alpacas: {
    label: 'Alpacas',
    isFilled: false,
    component: <StyledPath strokeColor="#ff69b4" strokeWidth={2} />,
  },
};

const TOOLTIP = {
  isVisible: true,
  component: <StyledTooltip />,
  hints: {
    dogs: <StyledHint backgroundColor="#3ab997" />,
    cats: <StyledHint backgroundColor="#3a54b9" />,
    pets: <StyledHint backgroundColor="#c8cc48" />,
    alpacas: <StyledHint backgroundColor="#ff69b4" />,
  },
};

const StyledLineChart = () => {
  // xAxis uses the 'weekday' as a key to build itself
  // you can change it to anything you want
  const data = [
    {
      weekday: 'Sun',
      dogs: 1,
      cats: 2,
      pets: 1,
      alpacas: 1,
    },
    {
      weekday: 'Mon',
      dogs: 6,
      cats: 3,
      pets: 1,
      alpacas: 1,
    },
    {
      weekday: 'Tue',
      dogs: 8,
      cats: 4,
      pets: 4,
      alpacas: 2,
    },
    {
      weekday: 'Wed',
      dogs: 18,
      cats: 5,
      pets: 12,
      alpacas: 3,
    },
    {
      weekday: 'Thu',
      dogs: 16,
      cats: 6,
      pets: 8,
      alpacas: 4,
    },
    {
      weekday: 'Fri',
      dogs: 30,
      cats: 7,
      pets: 24,
      alpacas: 5,
    },
    {
      weekday: 'Sat',
      dogs: 24,
      cats: 8,
      pets: 12,
      alpacas: 6,
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
