import * as React  from 'react'
import styled from 'styled-components'
import StyledLineChart from './StyledLineChart'
import StyledBarChart from './StyledBarChart'

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  padding: 0;
  margin: 0 auto;
  @media (max-width: 767px) {
    width: 100%;
    margin: 0;
  }
`

const BasicChartsWrapper = styled.section`
  display: flex;
  padding: 16px 0;
  margin: 16px auto;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  height: auto;
  @media (max-width: 767px) {
    flex-wrap: wrap;
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

