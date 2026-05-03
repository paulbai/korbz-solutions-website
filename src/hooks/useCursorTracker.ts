import { useEffect, useCallback } from 'react';

export const useCursorTracker = () => {
  const updateCursorPosition = useCallback((e: MouseEvent, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    element.style.setProperty('--mouse-x', `${x}%`);
    element.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  const addCursorTracking = useCallback((element: HTMLElement) => {
    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e, element);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.classList.add('cursor-track');

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.classList.remove('cursor-track');
    };
  }, [updateCursorPosition]);

  return { addCursorTracking };
};