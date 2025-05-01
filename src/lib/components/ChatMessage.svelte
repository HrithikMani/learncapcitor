<script>
    export let message;
    
    // Format timestamp
    function formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  </script>
  
  <div class="message {message.isUser ? 'user-message' : 'bot-message'}">
    <div class="avatar">
      {#if message.isUser}
        👤
      {:else}
        🤖
      {/if}
    </div>
    
    <div class="message-content">
      {#if message.isLoading}
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      {:else}
        <div class="message-text">
          {#if typeof message.text === 'string'}
            {#each message.text.split('\n') as line}
              <p>{line}</p>
            {/each}
          {:else}
            <p>{JSON.stringify(message.text)}</p>
          {/if}
        </div>
        
        {#if message.toolResults && message.toolResults.length > 0}
          <div class="tool-results">
            <h4>Tool Results:</h4>
            <ul>
              {#each message.toolResults as result}
                <li>
                  <strong>{result.toolName}:</strong> 
                  {#if result.error}
                    <span class="error">{result.error}</span>
                  {:else}
                    {result.data}
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        {/if}
        
        {#if message.timestamp}
          <div class="timestamp">
            {formatTime(message.timestamp)}
          </div>
        {/if}
      {/if}
    </div>
  </div>
  
  <style>
    .message {
      display: flex;
      margin-bottom: 1rem;
      max-width: 85%;
    }
    
    .user-message {
      margin-left: auto;
      flex-direction: row-reverse;
    }
    
    .bot-message {
      margin-right: auto;
    }
    
    .avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin: 0 0.75rem;
      flex-shrink: 0;
    }
    
    .user-message .avatar {
      background-color: #4a56e2;
      color: white;
    }
    
    .message-content {
      background-color: white;
      padding: 0.75rem;
      border-radius: 1rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .user-message .message-content {
      background-color: #4a56e2;
      color: white;
    }
    
    .message-text p {
      margin: 0.5rem 0;
      line-height: 1.4;
    }
    
    .message-text p:first-child {
      margin-top: 0;
    }
    
    .message-text p:last-child {
      margin-bottom: 0;
    }
    
    .typing-indicator {
      display: flex;
      align-items: center;
      padding: 0.25rem 0;
    }
    
    .typing-indicator span {
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #aaa;
      border-radius: 50%;
      margin: 0 2px;
      animation: bounce 1.5s infinite ease-in-out;
    }
    
    .user-message .typing-indicator span {
      background-color: rgba(255, 255, 255, 0.7);
    }
    
    .typing-indicator span:nth-child(1) {
      animation-delay: 0ms;
    }
    
    .typing-indicator span:nth-child(2) {
      animation-delay: 200ms;
    }
    
    .typing-indicator span:nth-child(3) {
      animation-delay: 400ms;
    }
    
    @keyframes bounce {
      0%, 80%, 100% { 
        transform: scale(0);
      }
      40% { 
        transform: scale(1.0);
      }
    }
    
    .timestamp {
      font-size: 0.75rem;
      color: #999;
      margin-top: 0.5rem;
      text-align: right;
    }
    
    .user-message .timestamp {
      color: rgba(255, 255, 255, 0.7);
    }
    
    .tool-results {
      margin-top: 0.75rem;
      padding-top: 0.75rem;
      border-top: 1px solid #eee;
      font-size: 0.9rem;
    }
    
    .tool-results h4 {
      margin: 0 0 0.5rem 0;
      font-size: 0.9rem;
    }
    
    .tool-results ul {
      margin: 0;
      padding-left: 1.5rem;
    }
    
    .tool-results li {
      margin-bottom: 0.5rem;
    }
    
    .error {
      color: #e53935;
    }
    
    .user-message .error {
      color: #ffcdd2;
    }
  </style>