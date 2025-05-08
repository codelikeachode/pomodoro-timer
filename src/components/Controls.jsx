import React from 'react';

const Controls = ({ onStart, onStop, onResume, onReset, isActive, isPaused }) => {
  return (
    <div className="controls">
      {!isActive && !isPaused && (
        <button onClick={onStart} aria-label="Start timer">
          <span>
            Start
          </span>
        </button>
      )}
      {isActive && !isPaused && (
        <button onClick={onStop} aria-label="Stop timer">
          <span>
            Stop
          </span>
        </button>
      )}
      {isPaused && (
        <button onClick={onResume} aria-label="Resume timer">
          <span>
            Resume
          </span>
        </button>
      )}
      {(isActive || isPaused) && (
        <button onClick={onReset} aria-label="Reset timer and settings">
          <span>
            Reset
          </span>
        </button>
      )}
    </div>
  );
};

export default Controls;