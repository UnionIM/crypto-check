import { useEffect } from 'react';

export const useOutsideClick = (onClickOutside: () => void, ref: any) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLDivElement)
      ) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);
};
