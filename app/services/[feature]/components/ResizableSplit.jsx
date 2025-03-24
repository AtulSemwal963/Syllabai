import React from 'react';
import useResizable from '../hooks/useResizable';

const ResizableSplit = ({ leftContent, rightContent }) => {
  const { leftWidth, handleMouseDown } = useResizable();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 flex" style={{ height: '95vh' }}>
        <div style={{ width: `${leftWidth}%`, minWidth: '20%', maxWidth: '80%' }}>{leftContent}</div>
        <div
          className="w-2 bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors"
          onMouseDown={handleMouseDown}
        />
        <div style={{ width: `${100 - leftWidth}%`, minWidth: '20%' }}>{rightContent}</div>
      </div>
    </div>
  );
};

export default ResizableSplit;