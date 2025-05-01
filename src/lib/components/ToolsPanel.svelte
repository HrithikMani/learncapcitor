<script>
    import { availableTools, toggleTool } from '../tools/toolsStore';
    
    let isOpen = false;
    
    function togglePanel() {
      isOpen = !isOpen;
    }
  </script>
  
  <div class="tools-panel {isOpen ? 'open' : 'closed'}">
    <button class="toggle-button" on:click={togglePanel}>
      {isOpen ? '✕' : '🔧'}
      <span class="sr-only">{isOpen ? 'Close Tools' : 'Open Tools'}</span>
    </button>
    
    {#if isOpen}
      <div class="panel-content">
        <h3>Available Tools</h3>
        <p class="hint">Enable or disable tools to control what the assistant can access.</p>
        
        <div class="tools-list">
          {#each $availableTools as tool (tool.id)}
            <div class="tool {tool.enabled ? 'enabled' : 'disabled'}">
              <div class="tool-info">
                <div class="tool-icon">{tool.icon}</div>
                <div class="tool-details">
                  <div class="tool-name">{tool.name}</div>
                  <div class="tool-description">{tool.description}</div>
                </div>
              </div>
              
              <label class="switch">
                <input 
                  type="checkbox" 
                  checked={tool.enabled}
                  on:change={() => toggleTool(tool.id)}
                >
                <span class="slider"></span>
              </label>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
  
  <style>
    .tools-panel {
      position: fixed;
      top: 4rem;
      right: 0;
      bottom: 4rem;
      width: 300px;
      background-color: white;
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      z-index: 100;
    }
    
    .closed {
      transform: translateX(calc(100% - 2.5rem));
    }
    
    .open {
      transform: translateX(0);
    }
    
    .toggle-button {
      position: absolute;
      left: 0;
      top: 1rem;
      transform: translateX(-100%);
      width: 2.5rem;
      height: 2.5rem;
      background-color: white;
      border: 1px solid #ddd;
      border-right: none;
      border-radius: 4px 0 0 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      cursor: pointer;
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    }
    
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    .panel-content {
      height: 100%;
      padding: 1rem;
      overflow-y: auto;
    }
    
    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
    }
    
    .hint {
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 1rem;
    }
    
    .tools-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .tool {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem;
      border-radius: 0.5rem;
      background-color: #f5f7fb;
      transition: background-color 0.2s;
    }
    
    .tool.enabled {
      background-color: #e6f0ff;
    }
    
    .tool.disabled {
      opacity: 0.7;
    }
    
    .tool-info {
      display: flex;
      align-items: center;
      flex: 1;
    }
    
    .tool-icon {
      font-size: 1.5rem;
      margin-right: 0.75rem;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .tool-details {
      flex: 1;
    }
    
    .tool-name {
      font-weight: bold;
    }
    
    .tool-description {
      font-size: 0.8rem;
      color: #666;
      margin-top: 0.25rem;
    }
    
    /* Toggle Switch Styles */
    .switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 20px;
      margin-left: 0.5rem;
    }
    
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
      border-radius: 34px;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
    
    input:checked + .slider {
      background-color: #4a56e2;
    }
    
    input:focus + .slider {
      box-shadow: 0 0 1px #4a56e2;
    }
    
    input:checked + .slider:before {
      transform: translateX(20px);
    }
  </style>