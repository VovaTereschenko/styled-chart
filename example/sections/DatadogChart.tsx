import * as React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Path,
  HintPoint,
  TooltipWrapper,
  TooltipListItemTextContent,
  TooltipXAxisValue,
  XGrid,
  YGrid,
} from '../../src/index';

interface IBpiData {
  bpi: {
    [key: string]: number;
  };
  period: number;
  annualMax: number;
  annualMin: number;
}

const CHART_HEIGHT = 300;
const CL_WHITE = '#ffffff';
const CL_DARK = '#000000';
const TOOLTIP_BG_COLOR = '#000';
const TOOLTIP_TEXT_COLOR = '#ffffff';
const CHART_LINES_FLEXURE = 1;
const CURRENCY = '$';
const BITCOIN_COLOR = '#eb8b2a';
const MAXIMUM_COLOR = '#eb2a2a';
const MINIMUM_COLOR = '#eb8b2a';
const GRID_COLOR = '#a7a7a720';

const BenchmarkFlag = styled.span`
  padding: 4px 0;
  font-size: 11px;
  text-align: left;
  padding: 2px;
  font-weight: 700;
  transform: translateX(-50%) translateY(calc(-100% - 8px));
`;

const BenchmarkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  font-size: 12px;
  border-radius: 0;
  box-sizing: border-box;
  padding: 0;
  width: 100%;
  transform: translateX(50%);
  height: 100%;
  position: absolute;
  border-left: 1px dashed ${MAXIMUM_COLOR}50;
`;

const StyledChartWrapper = styled.section<{ bgColor: string; color: string }>`
  ${({ bgColor, color }) => `
    width: 700px;
    min-height: 350px;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    background: ${bgColor};
    color: ${color};
    font-size: 14px;
    padding: 8px 16px 0px 8px;
    box-shadow: 0 10px 20px rgba(0,0,0,.4);
    border-radius: 5px;
    ${XGrid}, ${YGrid} {
      background: ${GRID_COLOR};
    }
  `}
  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

const StyledButton = styled.button<{ isActive: boolean; isRadio?: boolean }>`
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  color: inherit;
  font-size: 14px;
  font-weight: 500;
  color: inherit;
  border-bottom: 2px solid;
  &:hover {
    background: ${GRID_COLOR};
  }
  ${({ isActive, isRadio }) => `
    border-color: ${isActive ? 'inherit' : 'transparent'};
    margin-right: ${isRadio ? '4px' : '8px'};
    box-shadow: ${isRadio ? 'none' : `0px 0px 0px 1px ${GRID_COLOR}`};
    padding: ${isRadio ? '4px' : '4px 8px'};
    @media (max-width: 767px) {
      width: ${isRadio ? 'auto' : 'calc(50% - 4px)'};
      padding: ${isRadio ? '4px' : '8px'};
      margin-right: ${isRadio ? '8px' : '0'};
    }
  `}
`;

const SttyledChartHeader = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  & h2 {
    margin: 0 8px 0 0;
    padding: 8px;
    @media (max-width: 767px) {
      padding: 4px 4px 4px 8px;
      margin: 0;
    }
  }
  & > div {
    display: flex;
    align-items: center;
  }
  @media (max-width: 767px) {
    flex-wrap: wrap;
    & > div {
      margin-bottom: 16px;
      width: 100%;
      justify-content: space-between;
    }
  }
`;

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
        stroke-dasharray: ${strokeDasharray ? strokeDasharray : 0};
      `}
  }
`;

// That's how you style the 'colored hint dots' in the tooltip
const StyledHint = styled(HintPoint)<{ backgroundColor?: string }>`
  && {
    ${({ backgroundColor }) => `
        width: 10px;
        height: 10px;
        border: 2px solid #fff;
        background-color: ${backgroundColor};
      `}
  }
`;

const getConversionLineList = (prefix: string, num: number) => (
  <BenchmarkWrapper>
    <BenchmarkFlag>
      {prefix}: ${num}
    </BenchmarkFlag>
  </BenchmarkWrapper>
);

// That's how you can style the Tooltip
const StyledTooltip = styled(TooltipWrapper)<{
  backgroundColor?: string;
  textColor?: string;
}>`
  && {
    ${({ backgroundColor, textColor }) => `
        ${backgroundColor ? `background: ${backgroundColor}` : ``};
        ${textColor ? `color: ${textColor}` : ``};
        width: 160px;
      `}
    ${TooltipListItemTextContent} {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    // min-width: 200px;
    ${TooltipXAxisValue} {
      opacity: 0.8;
    }
    // Let's make a hint tooltip more as a line
    ${StyledHint} {
      padding-left: 4px;
      padding-right: 4px;
      border-radius: 20px;
      border: none;
      height: 3px;
    }
  }
`;

const formatYAxis = (val: number | string) => {
  return `${CURRENCY}${(Number(val) / 1000).toFixed(1)}k`;
};

const getMaxVal = ({ bpi }: IBpiData) =>
  Math.max(...Object.entries(bpi).map((item) => item[1]));

const getMinVal = ({ bpi }: IBpiData, period?: number) => {
  const entries = Object.entries(bpi);
  period = period || entries.length;
  return Math.min(
    ...entries
      .slice(entries.length - period, entries.length)
      .map((item) => item[1])
  );
};

const getFormattedDate = (
  yearDecrement: number = 0,
  monthDecrement: number = 0
) => {
  const date = new Date();
  const year = date.getFullYear() - yearDecrement;
  const month = date.getMonth() + 1 - monthDecrement;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${day}`;
};

const buildData = ({ bpi, period, annualMax, annualMin }: IBpiData) => {
  const entries = Object.entries(bpi);
  const limitedEntries = entries.slice(entries.length - period, entries.length);
  const highestValue = limitedEntries.sort((a, b) => b[1] - a[1])[0][1];
  const lowestValue = limitedEntries.sort((a, b) => a[1] - b[1])[0][1];

  return entries.reduce((acum, item) => {
    const dataItem = {
      date: new Date(item[0]).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
      }),
      bitcoin:
        item[1] === highestValue || item[1] === lowestValue
          ? {
              value: Math.round(item[1]),
              component: () =>
                getConversionLineList(
                  item[1] === highestValue ? 'Max' : 'Min',
                  Math.round(item[1])
                ),
            }
          : Math.round(item[1]),
      annualMax,
      annualMin,
    };
    return [...acum, ...[dataItem]];
  }, []);
};

// xAxis uses the 'weekday' as a key to prolongate the chart horizontally
// you can change it to anything you specify in the data items
// e.g. 'date'
const X_AXIS = {
  key: 'date',
  grid: true,
  step: 30,
  ticksNum: 100,
};

const Y_AXIS = {
  minValue: 55000,
  ticksNum: 5,
  formatFn: (val: number | string) => formatYAxis(val),
};

const LINE_CONFIG = {
  bitcoin: {
    label: 'Bitcoin',
    isFilled: true,
    denoteAs: CURRENCY,
    component: (
      <StyledPath
        strokeColor={BITCOIN_COLOR}
        fillColor={`${BITCOIN_COLOR}40`}
      />
    ),
  },
  annualMax: {
    label: 'Annual max.',
    isFilled: false,
    denoteAs: CURRENCY,
    component: (
      <StyledPath
        strokeColor={MAXIMUM_COLOR}
        strokeWidth={2}
        strokeDasharray={5}
      />
    ),
  },
  annualMin: {
    label: 'Annual min.',
    isFilled: true,
    denoteAs: CURRENCY,
    component: (
      <StyledPath
        strokeColor={MINIMUM_COLOR}
        fillColor={`${MINIMUM_COLOR}40`}
        strokeWidth={1}
        strokeDasharray={5}
      />
    ),
  },
};

const TOOLTIP = {
  isVisible: true,
  component: (
    <StyledTooltip
      backgroundColor={TOOLTIP_BG_COLOR}
      textColor={TOOLTIP_TEXT_COLOR}
    />
  ),
  hints: {
    bitcoin: <StyledHint backgroundColor={BITCOIN_COLOR} />,
    annualMax: <StyledHint backgroundColor={MAXIMUM_COLOR} />,
    annualMin: <StyledHint backgroundColor={MINIMUM_COLOR} />,
  },
};

const getYAxis = (annualMax?: number, annualMin?: number) =>
  Object.assign({}, Y_AXIS, {
    maxValue: annualMax ? annualMax + 5000 : undefined,
    minValue: annualMin ? annualMin - 5000 : undefined,
  });

const StyledLineChart = () => {
  const [bpiData, setBpiData] = React.useState<any>();
  const [annualData, setAnnualData] = React.useState<any>();
  const [withAnnualMin, setAnnualMin] = React.useState(false);
  const [isNightMode, toggleNightMode] = React.useState(false);
  const [period, setPeriod] = React.useState(30);

  function historicalReqListener() {
    setBpiData(JSON.parse(this.responseText));
  }

  function annualReqListener() {
    setAnnualData(JSON.parse(this.responseText));
  }

  React.useEffect(() => {
    const historicalReq = new XMLHttpRequest();
    const reqSearch = `start=${getFormattedDate(
      0,
      3
    )}&end=${getFormattedDate()}`;
    historicalReq.addEventListener('load', historicalReqListener);
    historicalReq.open(
      'GET',
      `https://api.coindesk.com/v1/bpi/historical/close.json?${reqSearch}`
    );
    historicalReq.send();

    const annualReq = new XMLHttpRequest();
    const annualReqSearch = `start=${getFormattedDate(
      1,
      0
    )}&end=${getFormattedDate()}`;
    annualReq.addEventListener('load', annualReqListener);
    annualReq.open(
      'GET',
      `https://api.coindesk.com/v1/bpi/historical/close.json?${annualReqSearch}`
    );
    annualReq.send();
  }, []);

  // xAxis uses the 'weekday' as a key to build itself
  // you can change it to anything you want

  const data =
    bpiData &&
    annualData &&
    buildData(
      Object.assign({}, bpiData, {
        period,
        annualMax: Math.round(getMaxVal(annualData)),
        annualMin: withAnnualMin && Math.round(getMinVal(annualData)),
      })
    );

  const getLineConfig = () => {
    const reslutingConfig = Object.entries(LINE_CONFIG).reduce((acum, item) => {
      if (item[0] !== 'annualMin' || withAnnualMin) {
        return Object.assign({}, acum, { [item[0]]: item[1] });
      }
      return acum;
    }, {});
    return reslutingConfig;
  };

  return data ? (
    <StyledChartWrapper
      color={isNightMode ? CL_WHITE : CL_DARK}
      bgColor={isNightMode ? CL_DARK : CL_WHITE}
    >
      <SttyledChartHeader>
        <div>
          <h2>Bitcoin/USD</h2>
          <div>
            <StyledButton
              isRadio
              isActive={period === 30}
              onClick={() => setPeriod(30)}
            >
              1 mo
            </StyledButton>
            <StyledButton
              isRadio
              isActive={period === 60}
              onClick={() => setPeriod(60)}
            >
              2 mo
            </StyledButton>
          </div>
        </div>
        <div>
          <StyledButton
            isActive={withAnnualMin}
            onClick={() => setAnnualMin(!withAnnualMin)}
          >
            Show annual min
          </StyledButton>
          <StyledButton
            isActive={isNightMode}
            onClick={() => toggleNightMode(!isNightMode)}
          >
            Night mode
          </StyledButton>
        </div>
      </SttyledChartHeader>
      <LineChart
        height={CHART_HEIGHT}
        flexure={CHART_LINES_FLEXURE}
        tooltip={TOOLTIP}
        yAxis={getYAxis(
          getMaxVal(annualData),
          withAnnualMin ? getMinVal(annualData) : getMinVal(bpiData, period)
        )}
        xAxis={Object.assign({}, X_AXIS, {
          ticksNum: period,
          step: period / 5,
        })}
        config={getLineConfig()}
        data={data}
      />
    </StyledChartWrapper>
  ) : (
    <StyledChartWrapper
      color={isNightMode ? CL_WHITE : CL_DARK}
      bgColor={isNightMode ? CL_DARK : CL_WHITE}
    >
      Loading...
    </StyledChartWrapper>
  );
};

export default StyledLineChart;
