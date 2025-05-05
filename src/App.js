import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';
import ChatsModal from './components/ChatsModal';
import SettingsModal from './components/SettingsModal';

function App() {
  // State management
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', content: 'Hello! How can I assist you today?', timestamp: new Date().toISOString() },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [activeMCP, setActiveMCP] = useState('Default AI');
  const [mcpList, setMcpList] = useState([
    { id: 'default', name: 'Default AI', endpoint: 'https://api.default-ai.com' },
    { id: 'mcp2', name: 'GPT Assistant', endpoint: 'https://api.gpt-assistant.com' },
    { id: 'mcp3', name: 'Custom Model', endpoint: 'https://api.custom-model.com' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 'conv1', title: 'Project Planning', date: '2 hours ago', preview: 'Let\'s discuss the timeline for...' },
    { id: 'conv2', title: 'Research Assistant', date: 'Yesterday', preview: 'I need help finding sources on...' },
    { id: 'conv3', title: 'Code Review Help', date: 'May 2', preview: 'Can you check this function for...' },
  ]);
  
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // API service functions
  const aiService = {
    // Simulate AI response
    getResponse: (userMessage) => {
      setIsTyping(true);
      
      // Simulate AI thinking time
      return new Promise((resolve) => {
        setTimeout(() => {
          const responses = [
            "I understand what you're asking about. Let me elaborate on that...",
            "That's an interesting question! Here's what I know about it...",
            "I'll help you with that. Based on my knowledge...",
            "Great question! Here's my analysis...",
            "I can assist with that. Here's some information that might help...",
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          resolve(randomResponse);
          setIsTyping(false);
        }, 1500);
      });
    }
  };
  
  // Conversations service
  const conversationsService = {
    // Select a conversation
    selectConversation: (conversationId) => {
      // In a real app, you'd load the conversation messages here
      setShowChats(false);
    },
    
    // Start a new chat
    startNewChat: () => {
      setMessages([{ id: 1, sender: 'ai', content: 'Hello! How can I assist you today?', timestamp: new Date().toISOString() }]);
      setShowChats(false);
    }
  };
  
  // MCP service functions
  const mcpService = {
    // Add a new MCP
    addMCP: (name, endpoint) => {
      if (!name.trim() || !endpoint.trim()) return false;
      
      const newMCP = {
        id: `mcp-${Date.now()}`,
        name: name,
        endpoint: endpoint
      };
      
      setMcpList(prev => [...prev, newMCP]);
      return true;
    },
    
    // Delete an MCP
    deleteMCP: (id) => {
      const mcp = mcpList.find(mcp => mcp.id === id);
      setMcpList(prev => prev.filter(mcp => mcp.id !== id));
      
      // If active MCP is deleted, switch to Default
      if (mcp?.name === activeMCP) {
        setActiveMCP('Default AI');
      }
      
      return true;
    },
    
    // Set active MCP
    setActiveMCP: (mcpName) => {
      setActiveMCP(mcpName);
    }
  };
  
  // Message handling functions
  const messageHandlers = {
    // Send a new message
    sendMessage: async () => {
      if (inputMessage.trim() === '') return;
      
      const newMessage = {
        id: Date.now(),
        sender: 'user',
        content: inputMessage,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, newMessage]);
      const currentInput = inputMessage;
      setInputMessage('');
      
      // Get AI response
      try {
        const response = await aiService.getResponse(currentInput);
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'ai',
          content: response,
          timestamp: new Date().toISOString()
        }]);
      } catch (error) {
        console.error('Error getting AI response:', error);
      }
    },
    
    // Copy message to clipboard
    copyMessage: (content) => {
      navigator.clipboard.writeText(content);
      // Would show a toast notification in a real app
    }
  };

  return (
    <div className="app-container">
      <Header 
        activeMCP={activeMCP}
        onChatsClick={() => setShowChats(true)}
        onSettingsClick={() => setShowSettings(true)}
      />

      <MessageList 
        messages={messages}
        isTyping={isTyping}
        activeMCP={activeMCP}
        onCopyMessage={messageHandlers.copyMessage}
        messagesEndRef={messagesEndRef}
      />
      
      <InputArea 
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={messageHandlers.sendMessage}
      />
      
      {showChats && (
        <ChatsModal 
          conversations={conversations}
          onClose={() => setShowChats(false)}
          onSelectConversation={conversationsService.selectConversation}
          onNewChat={conversationsService.startNewChat}
        />
      )}
      
      {showSettings && (
        <SettingsModal 
          mcpList={mcpList}
          activeMCP={activeMCP}
          onClose={() => setShowSettings(false)}
          onSetActiveMCP={mcpService.setActiveMCP}
          onDeleteMCP={mcpService.deleteMCP}
          onAddMCP={mcpService.addMCP}
        />
      )}
    </div>
  );
}

export default App;