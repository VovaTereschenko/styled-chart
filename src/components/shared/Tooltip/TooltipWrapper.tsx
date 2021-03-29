import styled from 'styled-components'
import HintPoint from '../HandyStuff/HintPoint'

const TooltipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: auto;
  background: #303030;
  border-radius: 5px;
  color: #fff;
  padding: 8px;
  font-size: 14px;
  transition: 0.08s all linear;
  min-width: 120px;
  max-width: 220px;
  ${HintPoint} {
    margin-right: 4px;
  }
`

export default TooltipWrapper
