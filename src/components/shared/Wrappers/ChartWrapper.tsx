import styled from 'styled-components';
import constants from '../../../constants';

const getHeight = (height?: number | string) =>
  height
    ? typeof height === 'number'
      ? `${height}px`
      : height
    : constants.chartHeight;

const ChartWrapper = styled.section<{ height?: string | number }>`
  display: flex;
  ${({ height }) => `
    height: ${getHeight(height)};
  `}
  width: 100%;
  box-sizing: border-box;
  padding: 8px 8px 48px 8px;
  position: relative;
`;

export default ChartWrapper;
