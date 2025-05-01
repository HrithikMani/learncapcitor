<script>
    import { onMount } from 'svelte';
    import { messages, sendMessageWithResponse } from '$lib/stores/chatStore';
    import { availableTools } from '$lib/tools/toolsStore';
    import ChatMessage from '$lib/components/ChatMessage.svelte';
    import ToolsPanel from '$lib/components/ToolsPanel.svelte';
    
    let userInput = '';
    let chatContainer;
    
    function handleSend() {
      if (userInput.trim() === '') return;
      
      // Send message and get response
      sendMessageWithResponse(userInput);
      
      // Clear input
      userInput = '';
    }
    
    function handleKeydown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    }
    
    // Auto-scroll when messages change
    $: if (chatContainer && $messages.length) {
      setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 0);
    }
    
    onMount(() => {
      // Focus the input on page load
      document.querySelector('textarea').focus();
    });
  </script>
  
  <main class="app-container">
    <header class="app-header">
      <h1>AI Chatbot</h1>
      <div class="tool-badges">
        {#each $availableTools.filter(tool => tool.enabled) as tool (tool.id)}
          <div class="tool-badge" title={tool.name}>{tool.icon}</div>
        {/each}
      </div>
    </header>
    
    <div class="chat-container" bind:this={chatContainer}>
      {#each $messages as message}
        <ChatMessage {message} />
      {/each}
    </div>
    
    <div class="input-container">
      <textarea 
        bind:value={userInput} 
        on:keydown={handleKeydown}
        placeholder="Type your message here..."
        rows="1"
      ></textarea>
      <button on:click={handleSend} disabled={userInput.trim() === ''}>
        Send
      </button>
    </div>
    
    <ToolsPanel />
  </main>
  
  <style>
    :global(body) {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #f5f7fb;
    }
    
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .app-header {
      padding: 1rem;
      background-color: #4a56e2;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .app-header h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    
    .tool-badges {
      display: flex;
      gap: 0.5rem;
    }
    
    .tool-badge {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    
    .chat-container {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      background-color: #f5f7fb;
    }
    
    .input-container {
      display: flex;
      padding: 1rem;
      border-top: 1px solid #e0e0e0;
      background-color: white;
      box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
    }
    
    textarea {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: none;
      font-family: inherit;
      font-size: 1rem;
      line-height: 1.5;
      min-height: 3rem;
      max-height: 10rem;
      overflow-y: auto;
    }
    
    textarea:focus {
      outline: none;
      border-color: #4a56e2;
      box-shadow: 0 0 0 2px rgba(74, 86, 226, 0.2);
    }
    
    button {
      margin-left: 0.5rem;
      padding: 0 1.5rem;
      background-color: #4a56e2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.2s;
    }
    
    button:hover {
      background-color: #3a46c2;
    }
    
    button:disabled {
      background-color: #9da0c4;
      cursor: not-allowed;
    }
  </style>