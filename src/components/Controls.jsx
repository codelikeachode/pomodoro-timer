import React from 'react';

const Controls = ({ onStart, onStop, onResume, onReset, isActive, isPaused }) => {
  return (
    <div className="controls">
      {!isActive && !isPaused && (
        <button onClick={onStart} aria-label="Start timer">
          Start
        </button>
      )}
      {isActive && !isPaused && (
        <button onClick={onStop} aria-label="Stop timer">
          Stop
        </button>
      )}
      {isPaused && (
        <button onClick={onResume} aria-label="Resume timer">
          Resume
        </button>
      )}
      {(isActive || isPaused) && (
        <button onClick={onReset} aria-label="Reset timer and settings">
          Reset
        </button>
      )}
    </div>
  );
};

export default Controls;