import { writable, get } from 'svelte/store';
import { processMessageWithTools } from 'lib/tools/toolManager';
import { availableTools } from '../tools/toolsStore';

// Initialize the chat messages store
export const messages = writable([
  {
    text: "Hello! I'm your assistant with tools. How can I help you today?",
    isUser: false,
    timestamp: new Date()
  }
]);

// Add a new message to the chat
export function addMessage(text, isUser = true, toolResults = null) {
  messages.update(msgs => [
    ...msgs,
    {
      text,
      isUser,
      toolResults,
      timestamp: new Date()
    }
  ]);
}

// Add a loading message
export function addLoadingMessage() {
  messages.update(msgs => [
    ...msgs,
    {
      isLoading: true,
      isUser: false
    }
  ]);
}

// Replace the loading message with actual response
export function replaceLoadingWithResponse(text, toolResults = null) {
  messages.update(msgs => {
    const newMsgs = [...msgs];
    const loadingIndex = newMsgs.findIndex(m => m.isLoading);
    
    if (loadingIndex >= 0) {
      newMsgs[loadingIndex] = {
        text,
        isUser: false,
        toolResults,
        timestamp: new Date()
      };
    }
    
    return newMsgs;
  });
}

// Send a message and get response with tools
export async function sendMessageWithResponse(text) {
  // Add user message
  addMessage(text, true);
  
  // Add loading indicator
  addLoadingMessage();
  
  try {
    // Get enabled tools
    const enabledTools = get(availableTools).filter(tool => tool.enabled);
    
    // Process message with tools
    const { response, toolResults } = await processMessageWithTools(text, enabledTools);
    
    // Replace loading with response
    replaceLoadingWithResponse(response, toolResults);
  } catch (error) {
    console.error('Error processing message:', error);
    
    // Replace loading with error
    replaceLoadingWithResponse(`Sorry, there was an error processing your message: ${error.message}`);
  }
}