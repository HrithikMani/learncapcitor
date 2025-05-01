import adapter from '@sveltejs/adapter-static'; // Make sure you're using adapter-static

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // Use 'build' as the output directory
      fallback: 'index.html' // Important for SPA routing
    })
  }
};

export default config;