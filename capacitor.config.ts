import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.mychatbotapp',
  appName: 'My Chatbot App',
  webDir: 'build', // Change this to match SvelteKit's output directory
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;