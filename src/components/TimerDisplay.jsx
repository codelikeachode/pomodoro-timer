import React from 'react';

const TimerDisplay = ({ minutes, seconds, sessionType }) => {
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  let sessionClass = '';
  if (sessionType === 'Work') {
    sessionClass = 'work';
  } else if (sessionType === 'Short Break') {
    sessionClass = 'short-break';
  } else if (sessionType === 'Long Break') {
    sessionClass = 'long-break';
  }

  return (
    <div className="timer-display-wrapper">
      <div className={`session-type ${sessionClass}`} aria-live="polite">
        {sessionType}
      </div>
      <div className={`timer-display ${sessionClass}`} aria-label={`Time remaining: ${minutes} minutes and ${seconds} seconds`}>
        {formattedMinutes}:{formattedSeconds}
      </div>
    </div>
  );
};

export default TimerDisplay;