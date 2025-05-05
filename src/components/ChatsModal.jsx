import React from 'react';

const ChatsModal = ({ conversations, onClose, onSelectConversation, onNewChat }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <h2>Your Conversations</h2>
          <button 
            className="close-button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <div className="sidebar-content">
          {conversations.map(conv => (
            <div 
              key={conv.id} 
              className="conversation-item"
              onClick={() => onSelectConversation(conv.id)}
            >
              <div className="conversation-icon">💬</div>
              <div className="conversation-info">
                <div className="conversation-title">{conv.title}</div>
                <div className="conversation-preview">{conv.preview}</div>
                <div className="conversation-date">{conv.date}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="sidebar-footer">
          <button 
            className="new-chat-button"
            onClick={onNewChat}
          >
            <span className="button-icon">+</span>
            New Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatsModal;