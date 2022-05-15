import { IConfig, IConfigItem } from '../types';

const buildPathD = (
  dataKey: string,
  dataSlice: number[],
  config: IConfig,
  SVGHeight: number,
  SVGWidth: number,
  cellsNumber: number,
  yAxisMax: number,
  yAxisMin: number,
  flexure: IConfigItem['flexure']
) =>
  dataSlice.reduce((acum, item, i) => {
    const calcY = (val: number) =>
      SVGHeight - (SVGHeight / (yAxisMax - yAxisMin)) * (val - yAxisMin);

    const prevItem = dataSlice[i - 1] || 0,
      prevIndex = i > 1 ? i - 1 : 0,
      prevY = calcY(prevItem),
      prevX = (SVGWidth / (cellsNumber - 1)) * prevIndex;

    const x = (SVGWidth / (cellsNumber - 1)) * i,
      y = calcY(item);

    let resultingFlexure =
      (config[dataKey] && config[dataKey].flexure) || flexure;
    if (Number(resultingFlexure) >= 0 || Number(resultingFlexure) <= 100) {
      resultingFlexure = Number(resultingFlexure);
    } else {
      throw new Error('Flexure must be between 0 and 100');
    }

    const reservedStrokeWidth = 100;

    const deltaPull = 100,
      deltaSmall = resultingFlexure,
      deltaLarge = 100 - resultingFlexure;

    const delta = (x - prevX) / deltaPull;

    const ponintsSlice =
      i === 0
        ? `m ${x} ${y} `
        : `c ${delta * deltaSmall} 0 ${delta * deltaLarge} ${y - prevY} ${
            x - prevX
          } ${y - prevY} `;

    const lastSlice =
      i === dataSlice.length - 1
        ? // We build the full chart is isFilled flag is provided
          `c ${delta * deltaSmall} 0 ${delta * deltaLarge} ${y - prevY} ${
            x - prevX
          } ${y - prevY} H ${x + reservedStrokeWidth} V ${
            SVGHeight + reservedStrokeWidth
          } H 0`
        : undefined;

    return (acum += lastSlice || ponintsSlice);
  }, '');

export default buildPathD;
