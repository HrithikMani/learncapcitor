import { writable } from 'svelte/store';

// Initial set of tools
const initialTools = [
  {
    id: 'weather',
    name: 'Weather Tool',
    description: 'Get weather information for a location',
    icon: '☁️',
    enabled: true
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Perform mathematical calculations',
    icon: '🧮',
    enabled: true
  },
  {
    id: 'search',
    name: 'Web Search',
    description: 'Search the web for information',
    icon: '🔍',
    enabled: true
  }
];

// Create the store
export const availableTools = writable(initialTools);

// Helper functions
export function toggleTool(toolId) {
  availableTools.update(tools => 
    tools.map(tool => 
      tool.id === toolId ? {...tool, enabled: !tool.enabled} : tool
    )
  );
}

export function addTool(tool) {
  availableTools.update(tools => [...tools, tool]);
}

export function removeTool(toolId) {
  availableTools.update(tools => tools.filter(tool => tool.id !== toolId));
}