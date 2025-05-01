// Tool Manager - Handles processing messages with tools

// Process a message with enabled tools
export async function processMessageWithTools(message, enabledTools) {
    // Determine which tools to use
    const toolsToUse = determineToolsForMessage(message, enabledTools);
    const toolResults = [];
    
    // Execute each tool
    for (const tool of toolsToUse) {
      try {
        const result = await executeTool(tool.id, message);
        toolResults.push({
          toolId: tool.id,
          toolName: tool.name,
          data: result
        });
      } catch (error) {
        console.error(`Error executing tool ${tool.id}:`, error);
        toolResults.push({
          toolId: tool.id,
          toolName: tool.name,
          error: error.message
        });
      }
    }
    
    // Generate response based on tool results
    const response = generateResponse(message, toolResults);
    
    return { response, toolResults };
  }
  
  // Determine which tools to use for a message
  function determineToolsForMessage(message, enabledTools) {
    const toolsToUse = [];
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword matching for tools
    for (const tool of enabledTools) {
      switch (tool.id) {
        case 'weather':
          if (
            lowerMessage.includes('weather') || 
            lowerMessage.includes('temperature') || 
            lowerMessage.includes('forecast') ||
            /what('s| is) the weather (like )?(in|at) .+/.test(lowerMessage)
          ) {
            toolsToUse.push(tool);
          }
          break;
          
        case 'calculator':
          if (
            lowerMessage.includes('calculate') || 
            lowerMessage.includes('compute') ||
            lowerMessage.includes('math') ||
            lowerMessage.includes('solve') ||
            /\d+\s*[\+\-\*\/]\s*\d+/.test(lowerMessage)
          ) {
            toolsToUse.push(tool);
          }
          break;
          
        case 'search':
          if (
            lowerMessage.includes('search') || 
            lowerMessage.includes('find') || 
            lowerMessage.includes('look up') ||
            lowerMessage.includes('information about') ||
            lowerMessage.includes('what is') ||
            lowerMessage.includes('who is') ||
            lowerMessage.includes('when was')
          ) {
            toolsToUse.push(tool);
          }
          break;
      }
    }
    
    return toolsToUse;
  }
  
  // Execute a specific tool
  async function executeTool(toolId, message) {
    switch (toolId) {
      case 'weather':
        return await executeWeatherTool(message);
        
      case 'calculator':
        return await executeCalculatorTool(message);
        
      case 'search':
        return await executeSearchTool(message);
        
      default:
        throw new Error(`Unknown tool: ${toolId}`);
    }
  }
  
  // Weather tool implementation
  async function executeWeatherTool(message) {
    // Extract location from message
    const location = extractLocation(message);
    
    if (!location) {
      return "I couldn't determine the location. Please specify a city or place.";
    }
    
    // Simulate API call (replace with actual API in production)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response (replace with actual API call)
    return `Current weather in ${location}: 72°F, Partly Cloudy, Humidity: 45%`;
  }
  
  // Helper to extract location from message
  function extractLocation(message) {
    const patterns = [
      /weather in (.+)/i,
      /temperature in (.+)/i,
      /forecast for (.+)/i,
      /what(?:'s| is) the weather (?:like )?(?:in|at) (.+)/i
    ];
    
    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        // Clean up the location
        return match[1].trim()
          .replace(/\?$/, '')  // Remove trailing question mark
          .replace(/\.$/, ''); // Remove trailing period
      }
    }
    
    // Default extraction - take the last few words
    const words = message.split(' ');
    if (words.length > 2) {
      return words.slice(-2).join(' ')
        .replace(/\?$/, '')
        .replace(/\.$/, '');
    }
    
    return null;
  }
  
  // Calculator tool implementation
  async function executeCalculatorTool(message) {
    // Extract mathematical expression
    const expression = extractExpression(message);
    
    if (!expression) {
      return "I couldn't determine the calculation to perform.";
    }
    
    try {
      // Validate expression for safety
      if (!isValidExpression(expression)) {
        return "Sorry, I can only perform simple calculations with +, -, *, /, and parentheses.";
      }
      
      // Evaluate the expression
      const result = Function(`'use strict'; return (${expression})`)();
      return `${expression} = ${result}`;
    } catch (error) {
      return `Error calculating: ${error.message}`;
    }
  }
  
  // Helper to extract mathematical expression
  function extractExpression(message) {
    const patterns = [
      /calculate\s+([\d\s\+\-\*\/\(\)\.]+)/i,
      /compute\s+([\d\s\+\-\*\/\(\)\.]+)/i,
      /what is\s+([\d\s\+\-\*\/\(\)\.]+)/i,
      /([\d\s\+\-\*\/\(\)\.]+)\s*=\s*\?/i
    ];
    
    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    
    // Try to extract numbers and operators directly
    const mathPattern = /(\d+\s*[\+\-\*\/]\s*\d+)/;
    const directMatch = message.match(mathPattern);
    if (directMatch && directMatch[1]) {
      return directMatch[1].trim();
    }
    
    return null;
  }
  
  // Helper to validate expression for security
  function isValidExpression(expression) {
    // Only allow simple math operations
    return /^[\d\s\+\-\*\/\(\)\.]+$/.test(expression);
  }
  
  // Search tool implementation
  async function executeSearchTool(message) {
    // Extract search query
    const query = extractSearchQuery(message);
    
    if (!query) {
      return "I couldn't determine what to search for.";
    }
    
    // Simulate web search (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response (replace with actual search API integration)
    return `Search results for "${query}": Here are some relevant results. In a real implementation, this would connect to a search API.`;
  }
  
  // Helper to extract search query
  function extractSearchQuery(message) {
    const patterns = [
      /search for (.+)/i,
      /find (.+)/i,
      /look up (.+)/i,
      /information about (.+)/i,
      /what is (.+)/i,
      /who is (.+)/i
    ];
    
    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        return match[1].trim()
          .replace(/\?$/, '')  // Remove trailing question mark
          .replace(/\.$/, ''); // Remove trailing period
      }
    }
    
    // Default extraction - use the entire message except for tool commands
    return message
      .replace(/search for|find|look up|information about/gi, '')
      .trim()
      .replace(/\?$/, '')
      .replace(/\.$/, '');
  }
  
  // Generate a response based on tool results
  function generateResponse(message, toolResults) {
    if (toolResults.length === 0) {
      // No tools were used - provide a default response
      return `I understand your message about "${message}", but I'm not sure how to help with that specifically. You can ask me about the weather, calculations, or to search for information.`;
    }
    
    // Compile the results into a response
    let response = '';
    
    if (toolResults.length === 1) {
      // Single tool used
      const result = toolResults[0];
      if (result.error) {
        response = `I tried to use the ${result.toolName} tool, but encountered an error: ${result.error}`;
      } else {
        response = result.data;
      }
    } else {
      // Multiple tools used
      response = 'Here are the results from the tools I used:\n\n';
      toolResults.forEach(result => {
        if (result.error) {
          response += `${result.toolName}: Error - ${result.error}\n\n`;
        } else {
          response += `${result.toolName}: ${result.data}\n\n`;
        }
      });
    }
    
    return response;
  }