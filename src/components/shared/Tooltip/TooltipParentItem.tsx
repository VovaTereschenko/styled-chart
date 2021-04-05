import styled from 'styled-components'
import TooltipLabel from './TooltipLabel'
import TooltipValue from './TooltipValue'

const TooltipParentItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0 8px;
  ${TooltipValue}, ${TooltipLabel} {
    font-size: 18px;
  }
`

export default TooltipParentItem
