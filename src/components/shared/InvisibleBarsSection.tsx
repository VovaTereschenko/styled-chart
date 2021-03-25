import styled from 'styled-components'

const InvisibleBarsSection = styled.div<{widthFactor: number}>`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  position: absolute;
  ${({ widthFactor }) => `
    width: calc(100% + ${widthFactor}%);
    margin-left: calc(${-widthFactor/2}%);
  `}
`

export default InvisibleBarsSection
