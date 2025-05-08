import React from 'react';

const SessionTracker = ({ completedSessions, sessionsBeforeLongBreak }) => {
  return (
    <div className="session-tracker" aria-live="polite">
      Completed Work Sessions: {completedSessions} / {sessionsBeforeLongBreak}
    </div>
  );
};

export default SessionTracker;