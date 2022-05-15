import styled from 'styled-components';
import InvisibleBar from './InvisibleBar';
import HintPoint from '../HandyStuff/HintPoint';

const InvisibleBarGroupWrapper = styled.div<{ width: string, selected?: boolean, withSelection?: boolean, selectedByInterval?: boolean, isSelecting?: boolean, selectionHighlighter?: string }>`
  display: flex;
  height: 100%;
  align-items: flex-end;
  position: relative;
  ${({ width }) => `
    width: ${width};
  `}
  ${({ withSelection, isSelecting, selected }) => withSelection && isSelecting && `
    opacity: ${selected ? 1 : 0.8};
    transition: .1s opacity ease-in-out;
    background:  ${selected ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
  `}

${({ selectedByInterval, isSelecting, selectionHighlighter }) => selectedByInterval && !isSelecting  && `
     background: ${selectionHighlighter || 'rgba(0, 0, 0, 0.1)'};
  `}
  &:hover {
    ${InvisibleBar} {
      ${HintPoint} {
        opacity: 1;
      }
    }
  }
`;

export default InvisibleBarGroupWrapper;
