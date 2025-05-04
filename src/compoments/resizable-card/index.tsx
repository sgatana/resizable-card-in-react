import  { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import './index.scss';

const defaultHeight = 300;
const minHeight = 150;
const maxHeight = 800;

const ResizableCard = ({ children }: { children: ReactNode }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialY, setInitialY] = useState<number>(0);
  const [initialHeight, setInitialHeight] = useState<number>(0);
  const [currentHeight, setCurrentHeight] = useState(defaultHeight);

  // const cardRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLDivElement | null>(null);

  const onMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging) {
      return;
    }
    const deltaY = event.clientY - initialY!;
    let newHeight = initialHeight + deltaY;

    newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

    setCurrentHeight(newHeight);
  }, [isDragging, initialY, initialHeight]);

  const onMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      document.body.classList.remove('resizing');
    }
  }, [isDragging]);

  function onMouseDown(event: React.MouseEvent) {
    // const isCardClicked = cardRef.current?.contains(event.target as Node);
    const isDragHandleClicked = dragHandleRef.current?.contains(
      event.target as Node
    );
    if (isDragHandleClicked) {
      setIsDragging(true);
      setInitialY(event.clientY);
      setInitialHeight(currentHeight);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.body.classList.add('resizing');
    }
  }


  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  useEffect(() => {
    setCurrentHeight(defaultHeight);
  }, []);

  return (
    <div
      // ref={cardRef}
      className='resizable-card'
      style={{
        height: `${currentHeight}px`,
      }}
    
    >
      <div className='card-content'>{children}</div>
      <div ref={dragHandleRef} className='drag-handle'   onMouseDown={onMouseDown} />
    </div>
  );
};

export default ResizableCard;
