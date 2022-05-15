const getDenotedHeight = (height: string | number) =>
  typeof height === 'number'
    ? `${height}px`
    : height.includes('px') ||
      height.includes('%') ||
      height.includes('rem') ||
      height.includes('em') ||
      height.includes('vh')
    ? height
    : `${height}px`;

export default getDenotedHeight;
