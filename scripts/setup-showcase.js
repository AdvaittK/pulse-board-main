#!/usr/bin/env node

/**
 * Frontend Showcase Setup Script
 * 
 * This script helps explain the nature of this project as a frontend-only showcase
 * and provides guidance on how to interact with the mock data.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('\x1b[36m%s\x1b[0m', `
╔════════════════════════════════════════════════════╗
║                                                    ║
║              PULSEBOARD FRONTEND SHOWCASE            ║
║                                                    ║
╚════════════════════════════════════════════════════╝
`);

console.log('\x1b[33m%s\x1b[0m', `Welcome to the PulseBoard Frontend Showcase!`);
console.log('\x1b[0m', `
This project is a FRONTEND ONLY showcase of a dashboard application.
All backend functionality has been replaced with mock data for demonstration purposes.

Here's what you need to know:

1. The app uses mock data located in: lib/mock-data.ts
2. There is a mock API layer in: lib/mock-api/index.ts
3. Authentication is simulated (no real backend)
4. Database interactions are simulated

For the best showcase experience:
- Try both the admin and regular user views
- Explore all UI components in the dashboard
- Check out the responsive design on different screen sizes
`);

// Check if the .env.local file exists
const envPath = path.join(process.cwd(), '../.env.local');
const envExamplePath = path.join(process.cwd(), '../.env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('\x1b[33m%s\x1b[0m', `
No .env.local file found. Would you like me to create one for the frontend showcase? (y/n)
`);
  
  rl.question('> ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      try {
        // Create basic .env.local for frontend showcase
        fs.writeFileSync(envPath, `# Frontend Showcase Environment Variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=PulseBoard Frontend Showcase
NEXT_PUBLIC_APP_DESCRIPTION=A modern dashboard UI showcase
NEXT_PUBLIC_SHOW_MOCK_BANNER=true
`);
        console.log('\x1b[32m%s\x1b[0m', 'Created .env.local file for frontend showcase!');
      } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Error creating .env.local: ${error.message}`);
      }
    }
    
    console.log('\x1b[32m%s\x1b[0m', `
Setup Complete! 🎉

To start the frontend showcase:
1. Run 'pnpm dev' (or npm run dev)
2. Open http://localhost:3000 in your browser

Enjoy exploring the dashboard UI components!
`);
    rl.close();
  });
} else {
  console.log('\x1b[32m%s\x1b[0m', `
Setup Complete! 🎉

To start the frontend showcase:
1. Run 'pnpm dev' (or npm run dev)
2. Open http://localhost:3000 in your browser

Enjoy exploring the dashboard UI components!
`);
  rl.close();
}