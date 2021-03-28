import * as React  from 'react'
import styled from 'styled-components'
import StyledLineChart from './StyledLineChart'
import StyledBarChart from './StyledBarChart'

const ChartWrapper = styled.div`
  width: 100%;
  padding: 0 32px;
`

const BasicChartsWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 16px 0;
  margin: 16px auto;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  height: auto;
  @media (max-width: 767px) {
    flex-wrap: wrap;
    ${ChartWrapper} {
      width: 100%;
      margin: 0;
    }
  }
`

const BasicCharts = () =>
  <BasicChartsWrapper>
    <ChartWrapper>
      <StyledLineChart />
    </ChartWrapper>
    <ChartWrapper>
      <StyledBarChart />
    </ChartWrapper>
  </BasicChartsWrapper>

export default BasicCharts

