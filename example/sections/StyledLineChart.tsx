import * as React from 'react'
import styled from 'styled-components'
import {
  LineChart,
  Path,
  HintPoint,
  TooltipWrapper,
  TooltipLabel,
  TooltipValue,
  TooltipXAxisValue,
} from '../../src/index'

import {
  getRandomInt,
  getXAxisValue,
  createXAxisSnippet,
  createYAxisSnippet,
  createDataSnippet,
  createTooltipSnippet,
  createLineConfigSnippet,
} from '../utils'

import CodeSnippet from '../features/CodeSnippet'

import {
  IChartCreatorConfig,
} from '../types'

const StyledPath = styled(Path)
  <{strokeColor: string,
   strokeWidth?: number,
   fillColor?: string
  }>`
  && {
    ${({ strokeColor, strokeWidth, fillColor }) => `
      stroke: ${strokeColor};
      stroke-width: ${strokeWidth ? strokeWidth : 2}px;
      fill: ${fillColor ? fillColor : 'transparent'};
    `}
  }
`

const StyledHint = styled(HintPoint)<{backgroundColor: string}>`
  && {
    ${({ backgroundColor }) => `
      background-color: ${backgroundColor};
    `}
  }
`

const StyledTooltip = styled(TooltipWrapper)<{backgroundColor?: string, textColor?: string}>`
  && {
    ${({ backgroundColor, textColor }) => `
      ${backgroundColor ? `background: ${backgroundColor}` : ``};
      ${textColor ? `color: ${textColor}` : ``};
    `}
    ${StyledHint} {
      && {
        padding-left: 4px;
        padding-right: 4px;
        border-radius: 20px;
        height: 3px;
      }
    }
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

const CustomChartWrapper = styled.section`
  display: flex;
  flex-shrink: 0;
  width: 100%;
`

const LineChartWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const createConfig = (entities: IChartCreatorConfig['entities']) => {
  const config = entities.reduce((acum, entity) => {
    const obj = {
      [entity.id]: {
        label: entity.label,
        isFilled: Boolean(entity.secondaryColor),
        component: (
          <StyledPath 
            strokeColor={entity.mainColor}
            strokeWidth={entity.strokeWidth}
            fillColor={entity.secondaryColor} 
          />
        )
      }
    }
    return Object.assign({}, acum, obj)
  }, {})
  return config
}


const createTooltip = (entities: IChartCreatorConfig['entities'], tooltip: IChartCreatorConfig['tooltip']) => {
  const tooltipConfig = {
    isVisible: tooltip.isVisible,
    component: <StyledTooltip backgroundColor={tooltip.mainColor} textColor={tooltip.secondaryColor}/>,
    hints: createTooltipHints(entities)
  }

  return tooltipConfig
}


const createTooltipHints = (entities: IChartCreatorConfig['entities']) => {
  const config = entities.reduce((acum, entity) => {
    const obj = {
      [entity.id]: (
          <StyledHint 
            backgroundColor={entity.mainColor}
          />
        ),
      }
    return Object.assign({}, acum, obj)
  }, {})
  return config
}

const createData = (entities: IChartCreatorConfig['entities']) => {
  const keys = entities.map(entity => entity.id)

  const getKeyValueItem = (increment: number) =>
    keys.reduce((acum, key, index) => {
      const num = 
      index % 2
        ?  getRandomInt((increment + 50),  increment + 3 - index)
        :  getRandomInt((increment + 30), increment % 2 ? increment * 6 - index * 3 : increment * 4 - index * increment  )
      const obj = {
        [key]: num > 0 ? num : 1,
      }
      return Object.assign({}, acum, obj)
    },{})

  const data = getXAxisValue().map((weekday, index) => {
    const dataItem = {
      weekday,
      ...getKeyValueItem(index),
    }
    return dataItem
  })

  return data
}

const StyledLineChart = (props: IChartCreatorConfig) => {
  const { entities, yAxis, xAxis, height, flexure, tooltip } = props
  const [isTypescript, setTypescript] = React.useState(false)

  const handleLang = (val: boolean) => {
    if (val) setTypescript(true)
    else setTypescript(false)
  }

  const code = `
  import * as React from 'react'
  import styled from 'styled-components'
  import {
    LineChart,
    Path,
    HintPoint,
    TooltipWrapper,
    TooltipLabel,
    TooltipValue,
    TooltipXAxisValue,
  } from 'styled-chart'
  
  // That's how you style the paths for ${entities.map(entity => entity.label).join(', ')}
  // You can also adjust the other <path /> rules, such as stroke-dasharray
  const StyledPath = styled(Path)${!isTypescript ? '\`' : `
    <{strokeColor: string,
      strokeWidth?: number,
      fillColor?: string,
    }>\``}
    && {
      \${({ strokeColor, strokeWidth, fillColor }) =>\`
        stroke: \${strokeColor} !important;
        stroke-width: \${strokeWidth ? strokeWidth : 2}px;
        fill: \${fillColor ? fillColor : 'transparent'};
      \`}
    }
  \`

  // That's how you style the 'colored hint dots' in the tooltip
  const StyledHint = styled(HintPoint)${isTypescript ? `<{backgroundColor?: string, textColor?: string}>` : ''}\`
    && {
      \${({ backgroundColor }) => \`
        background-color: \${backgroundColor};
      \`}
    }
  \`

  // That's how you can style the Tooltip
  const StyledTooltip = styled(TooltipWrapper)${!isTypescript ? '\`' : `
  <{backgroundColor?: string,
    textColor?: string,
  }>\``}
    && {
      \${({ backgroundColor, textColor }) => \`
        \${backgroundColor ? \`background: \${backgroundColor}\` : \`\`};
        \${textColor ? \`color: \${textColor}\` : \`\`};
      \`}
      \${TooltipLabel} {
        font-style: italic;
      }
      \${TooltipValue} {
        font-style: italic;
      }
      \${TooltipXAxisValue} {
        opacity: 0.8;
      }
      // Let's make a hint tooltip more as a line
      \${StyledHint} {
        && {
          padding-left: 4px;
          padding-right: 4px;
          border-radius: 20px;
          height: 3px;
        }
      }
    }
  \`

  const CHART_HEIGHT = ${height}
  const CHART_LINES_FLEXURE = ${flexure}
  ${createXAxisSnippet(xAxis)}${createYAxisSnippet(yAxis)}${createLineConfigSnippet(entities)}${createTooltipSnippet(entities, tooltip)}
  
  const StyledLineChart = () => {${createDataSnippet(entities)}
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
    )
  }
    
  export default StyledLineChart
  `

  return (
    <LineChartWrapper>
      <CustomChartWrapper>
        <LineChart
          height={height}
          flexure={flexure} 
          tooltip={createTooltip(entities, tooltip)}
          yAxis={yAxis}
          xAxis={Object.assign({}, {key: 'weekday'}, xAxis)}
          config={createConfig(entities)}
          data={React.useMemo(() => createData(entities), [entities])}
        />
      </CustomChartWrapper>
      <CodeSnippet toggleLang={handleLang} currentLang={isTypescript ? 'Typescript' : 'Javascript'} code={code} />
    </LineChartWrapper>
  )
}

export default StyledLineChart
