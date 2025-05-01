import axios from 'axios';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const MODEL = 'claude-3-opus-20240229'; // You can change to other Claude models

export async function sendMessageToClaude(message, conversation = []) {
  try {
    // Format conversation history for Claude
    const messages = formatConversation(conversation, message);
    
    // Make API request to Claude
    const response = await axios.post(
      ANTHROPIC_API_URL,
      {
        model: MODEL,
        messages: messages,
        max_tokens: 1024,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );
    
    return response.data.content[0].text;
  } catch (error) {
    console.error('Error communicating with Claude API:', error);
    throw new Error('Failed to get a response from Claude');
  }
}

// Format conversation history for Claude API
function formatConversation(history, newMessage) {
  // Start with system message
  const messages = [
    {
      role: 'system',
      content: 'You are Claude, an AI assistant built by Anthropic. You are integrated into a chat application with different tools. Be helpful, concise, and friendly.'
    }
  ];
  
  // Add conversation history
  for (const msg of history) {
    messages.push({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    });
  }
  
  // Add the new user message
  messages.push({
    role: 'user',
    content: newMessage
  });
  
  return messages;
}