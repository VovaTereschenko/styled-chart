const buildTooltipTransform = (
  left: number,
  bottom: number,
  singleBarPersentage: number,
  barsPersentageAdjustment: number,
  isBarChart: boolean,
  isSmartTooltipPositioning: boolean,
) => {

  if (!isSmartTooltipPositioning) {
    return {
      left,
      translateX: -50,
      translateY: 0,
      xOffset: 0,
      yOffset: -8,
    }
  }
  
  const isRightSide = left > 50,
    mdOffset = 8,
    smOffset = 4

  let translateX = 0,
    xOffset = 12,
    translateY = 30,
    yOffset = 0
   
    
  if (isRightSide) {
    translateX = -100
    xOffset = isBarChart ? 12 : -12
    left += barsPersentageAdjustment
  }

  // there are some diff on the width calc for bars and lines
  if (!isBarChart) {
    // if we have small values, let's show it above the lines
    if (bottom < 33) {
      translateY = 0
      yOffset = -mdOffset
      xOffset = isRightSide ? mdOffset : -mdOffset
      // let it adapt to the bottom value
    } else if (bottom > 50) {
      translateY = bottom
    }
  } else {
    if (bottom < 50) {
      translateY = 0
      yOffset = -smOffset
      xOffset = 0
      if (isRightSide) xOffset = 0
    } else {
      isRightSide ? left -= singleBarPersentage : left += singleBarPersentage
      translateY = 100
      yOffset = 0
      xOffset = isRightSide ? -smOffset : smOffset
    }
  }

  return ({
    left,
    translateX,
    translateY,
    xOffset,
    yOffset,
  })
}

export default buildTooltipTransform
