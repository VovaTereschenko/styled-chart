import styled from 'styled-components'
import constants from '../../../constants'

const YAxisWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: ${constants.yAxisWidth};
  margin: 0;
  padding: 0;
  list-style: none;
`

export default YAxisWrapper
