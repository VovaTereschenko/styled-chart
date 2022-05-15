import styled from 'styled-components';
import HintPoint from '../HandyStuff/HintPoint';

const InvisibleBar = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 0;
  ${HintPoint} {
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%) translateY(-50%);
    transition: 0.1s all linear;
  }
`;

export default InvisibleBar;
