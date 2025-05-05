import React from 'react';

const TypingIndicator = ({ activeMCP }) => {
  return (
    <div className="message ai-message">
      <div className="avatar">
        🤖
      </div>
      <div className="message-content typing-indicator">
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;