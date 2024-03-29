import styled from 'styled-components';
import XAxisItem from './XAxisItem';

const XAxisLineWrapper = styled.aside`
  width: 100%;
  display: flex;
  position: relative;
  ${XAxisItem} {
    transform: translateX(-50%);
  }
`;

export default XAxisLineWrapper;
