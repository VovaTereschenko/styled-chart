import { useMemo } from 'react';

const useResize = (callback: (event: Event) => void): void => {
  const handleResize = useMemo(
    () => (event: Event) => callback(event),
    [callback]
  );

  window.addEventListener('resize', handleResize, false);
};

export default useResize;
