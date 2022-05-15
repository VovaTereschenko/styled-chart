import styled from 'styled-components';
import {
  XAxisBarWrapper,
  XAxisLineWrapper,
  XAxisItem,
  YAxisItem,
  YAxisWrapper,
  HintPoint,
} from '../../src/index';

export const MyYAxisWrapper = styled(YAxisWrapper)`
  padding: 0 8px;
  text-align: right;
  border-right: 2px solid #757575;
`;

export const MyYAxisItem = styled(YAxisItem)`
  font-weight: bold;
`;

export const MyXAxisItem = styled(XAxisItem)`
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #303030;
  font-weight: bold;
`;

export const MyXAxisBarWrapper = styled(XAxisBarWrapper)`
  border-top: 2px solid #757575;
`;

export const MyXAxisLineWrapper = styled(XAxisLineWrapper)`
  border-top: 2px solid #757575;
`;

export const StarredItemEmoji = styled.span`
  font-size: 24px;
`;

export const StarredItem = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgb(248, 182, 195) 100%
  );
  text-align: center;
  font-size: 12px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 16px 0;
  width: 100%;
  height: 100%;
`;

export const MyPointer = styled(HintPoint)<{ color: string }>`
  ${({ color }) => `
    background: ${color};
  `}
`;
