import styled from 'styled-components'
import InvisibleBar from './InvisibleBar'
import HintPoint from '../HandyStuff/HintPoint'

const InvisibleBarGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  :hover {
    ${InvisibleBar} {
      ${HintPoint} {
        opacity: 1;
      }
    }
  }
`

export default InvisibleBarGroup
