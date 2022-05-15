import styled from 'styled-components';

const InvisibleBarsSection = styled.div<{ dataLength: number }>`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  position: absolute;
  z-index: 1;
  ${({ dataLength }) => `
    width: calc(100% + ${100 / (dataLength - 1)}%);
    margin-left: calc(${-(100 + 100 / (dataLength - 1)) / dataLength / 2}%);
  `}
`;

export default InvisibleBarsSection;
