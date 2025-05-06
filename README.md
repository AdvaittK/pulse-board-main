# PulseBoard - Frontend Showcase

PulseBoard is a modern dashboard web application showcase featuring responsive UI components, interactive charts, and mock data visualization.

> **Note**: This is a **frontend showcase** only. All backend functionality has been replaced with mock data for demonstration purposes.

## 📋 Features

- **UI/UX Components**
  - Responsive dashboard layouts
  - Interactive charts and tables
  - Dark/Light theme support
  - Intuitive sidebar navigation

- **Data Visualization**
  - Mock data visualization
  - Interactive charts and graphs
  - Customizable views

- **Subscription Management UI**
  - Pricing plan comparison
  - Subscription feature showcase
  - Mock checkout flow

- **Frontend Patterns**
  - Component composition
  - Responsive design implementation
  - Theme switching
  - Mock data integration

## 🚀 Tech Stack

- **Frontend**
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - Various chart libraries

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.0+
- PNPM package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/dashboard-app.git
   cd dashboard-app
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

### Running the Application

1. Start the development server
   ```bash
   pnpm dev
   ```

2. Access the application at `http://localhost:3000`

## 📦 Project Structure

```
dashboard-app/
├── app/                # Next.js app directory
│   ├── dashboard/      # Dashboard pages
│   ├── login/          # Mock authentication pages
│   └── register/       # Mock registration page
├── components/         # React components
│   ├── ui/             # UI components
│   └── ...             # Other components
├── public/             # Static assets
└── lib/                # Utilities and mock data
    ├── mock-api/       # Mock API implementations
    └── mock-data.ts    # Mock data for frontend showcase
```

## 🖥️ Dashboard Features

- **Mock Data Visualization**: Dynamic charts with sample data
- **UI Component Showcase**: Various UI patterns and components
- **Admin Panel**: UI for user management and system monitoring
- **User Profile**: Account settings UI

## 🔄 Mock API

This showcase includes a mock API layer that simulates backend behavior:

```typescript
// Example usage of mock API
import { mockApi } from '../lib/mock-api';

// Get mock users data
const { data } = await mockApi.users.getAll();

// Work with the data as if it came from a real API
console.log(data);
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.