import styled from 'styled-components'
import InvisibleBar from './InvisibleBar'
import HintPoint from '../HandyStuff/HintPoint'

const InvisibleBarGroupWrapper = styled.div<{width: string}>`
  display: flex;
  height: 100%;
  align-items: flex-end;
  ${({ width }) => `
    width: ${width};
  `}
  &:hover {
    ${InvisibleBar} {
      ${HintPoint} {
        opacity: 1;
      }
    }
  }
`

export default InvisibleBarGroupWrapper
