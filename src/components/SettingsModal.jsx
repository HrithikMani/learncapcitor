import React, { useState } from 'react';

const SettingsModal = ({ mcpList, activeMCP, onClose, onSetActiveMCP, onDeleteMCP, onAddMCP }) => {
  const [newMCPName, setNewMCPName] = useState('');
  const [newMCPEndpoint, setNewMCPEndpoint] = useState('');

  const handleAddMCP = () => {
    if (onAddMCP(newMCPName, newMCPEndpoint)) {
      setNewMCPName('');
      setNewMCPEndpoint('');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
          <button 
            className="close-button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <div className="modal-content">
          <h3>Model Connection Points</h3>
          
          <div className="mcp-list">
            {mcpList.map((mcp) => (
              <div key={mcp.id} className="mcp-item">
                <div className="mcp-info">
                  <div className="mcp-icon">
                    {mcp.name === activeMCP ? '✓' : ''}
                  </div>
                  <div>
                    <div className="mcp-name">{mcp.name}</div>
                    <div className="mcp-endpoint">{mcp.endpoint}</div>
                  </div>
                </div>
                <div className="mcp-actions">
                  <button 
                    className={`use-button ${activeMCP === mcp.name ? 'active' : ''}`}
                    onClick={() => onSetActiveMCP(mcp.name)}
                  >
                    {activeMCP === mcp.name ? 'Active' : 'Use'}
                  </button>
                  {mcp.name !== 'Default AI' && (
                    <button 
                      className="delete-button"
                      onClick={() => onDeleteMCP(mcp.id)}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="add-mcp-section">
            <h4>Add New MCP</h4>
            <input
              type="text"
              className="mcp-input"
              placeholder="MCP Name"
              value={newMCPName}
              onChange={(e) => setNewMCPName(e.target.value)}
            />
            <input
              type="text"
              className="mcp-input"
              placeholder="API Endpoint URL"
              value={newMCPEndpoint}
              onChange={(e) => setNewMCPEndpoint(e.target.value)}
            />
            <button 
              className={`add-mcp-button ${
                newMCPName.trim() && newMCPEndpoint.trim() ? 'active' : 'disabled'
              }`}
              onClick={handleAddMCP}
              disabled={!newMCPName.trim() || !newMCPEndpoint.trim()}
            >
              <span className="button-icon">+</span>
              Add MCP
            </button>
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            className="close-modal-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;