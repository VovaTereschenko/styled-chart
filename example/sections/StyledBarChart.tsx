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

import {
  getRandomInt,
  getXAxisValue,
  createXAxisSnippet,
  createYAxisSnippet,
  createDataSnippet,
  createTooltipSnippet,
  createBarConfigSnippet,
} from '../utils'

import {
  IChartCreatorConfig,
} from '../types'


import CodeSnippet from '../features/CodeSnippet'

const StyledBarGroup = styled(BarGroup)`
  && {
    box-sizing: border-box;
    margin: 0 4px;
  }
`

const StyledBar = styled(Bar)<{backgroundColor: string}>`
  && {
    ${({ backgroundColor }) => `
      background-color: ${backgroundColor};
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
      ${backgroundColor ? `background: ${backgroundColor} !important` : ``};
      ${textColor ? `color: ${textColor} !important` : ``};
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
    ${StyledHint} {
      border-radius: 0;
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
        isParent: Boolean(entity.isParent),
        component:  Boolean(entity.isParent)
                      ? <StyledBarGroup />
                      : <StyledBar 
                          backgroundColor={entity.mainColor}
                        />
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
          :  getRandomInt((increment + 30), increment % 2 ? increment * 6 - index * 3 : increment * 4 - index * increment)
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
  const { entities, yAxis, xAxis, height, tooltip } = props
  const [isTypescript, setTypescript] = React.useState(false)

  const handleLang = (val: boolean) => {
    if (val) setTypescript(true)
    else setTypescript(false)
  }


  const code = `
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
  } from 'styled-chart'
  
  // That's how you style the bars e.g. ${entities.map(entity => !entity.isParent && entity.label).filter(item => item).join(', ')}
  const StyledBar = styled(Bar)${isTypescript ? `<{backgroundColor: string}>` : ''}\`
    && {
      \${({ backgroundColor }) => \`
        background-color: \${backgroundColor};
      \`}
    }
  \`
  // That's how you style the "parent" bar ${entities.map(entity => entity.isParent && entity.label).filter(item => item).join(', ')}
  const StyledBarGroup = styled(BarGroup)\`
    && {
      margin: 0 4px;
    }
  \`
  // That's how you can style the Tooltip
  const StyledTooltip = styled(TooltipWrapper)${isTypescript ? `<{backgroundColor?: string, textColor?: string}>` : ''}\`
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
    }
  \`
  // That's how you style the 'colored hint dots' in the tooltip
  const StyledHint = styled(HintPoint)${isTypescript ? `<{backgroundColor: string}>` : ''}\`
    && {
      \${({ backgroundColor }) => \`
        background-color: \${backgroundColor};
      \`}
    }
  \`
  const CHART_HEIGHT = ${height}
  ${createXAxisSnippet(xAxis)}${createYAxisSnippet(yAxis)}${createBarConfigSnippet(entities)}${createTooltipSnippet(entities, tooltip)}
  
  const StyledBarChart = () => {${createDataSnippet(entities)}
    return (
      <BarChart
        height={CHART_HEIGHT}
        tooltip={TOOLTIP}
        yAxis={Y_AXIS}
        xAxis={X_AXIS}
        config={CONFIG}
        data={data}
      />
    )
  }
    
  export default StyledBarChart
`


  return (
    <LineChartWrapper>
      <CustomChartWrapper>
        <BarChart
          height={height}
          tooltip={createTooltip(entities, tooltip)}
          yAxis={yAxis}
          xAxis={Object.assign({}, {key: 'weekday'}, xAxis)}
          config={createConfig(entities)}
          data={React.useMemo(() => createData(entities), [entities.length])}
        />
      </CustomChartWrapper>
      <CodeSnippet toggleLang={handleLang} currentLang={isTypescript ? 'Typescript' : 'Javascript'}  code={code} />
    </LineChartWrapper>
  )
}

export default StyledLineChart
