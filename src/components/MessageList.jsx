import React from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, isTyping, activeMCP, onCopyMessage, messagesEndRef }) => {
  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="messages-container">
      <div className="date-divider">Today</div>
      
      {messages.map(message => (
        <Message 
          key={message.id}
          message={message}
          activeMCP={activeMCP}
          formatTime={formatTime}
          onCopyMessage={onCopyMessage}
        />
      ))}
      
      {isTyping && <TypingIndicator activeMCP={activeMCP} />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;