# BigDays Wedding Landing - Monorepo

A modern wedding landing page built with React, TypeScript, and AWS Amplify, organized as a monorepo using pnpm.

## 🏗️ Project Structure

```
bigdays-monorepo/
├── apps/
│   ├── frontend/          # React frontend application
│   └── backend/           # AWS Amplify backend with NestJS
├── packages/              # Shared packages (future use)
├── pnpm-workspace.yaml    # pnpm workspace configuration
└── package.json           # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

1. Install pnpm globally (if not already installed):
   ```bash
   npm install -g pnpm
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

#### Run both frontend and backend in development mode:
```bash
pnpm dev
```

#### Run individual applications:
```bash
# Frontend only
pnpm frontend:dev

# Backend only
pnpm backend:dev
```

### Building

#### Build all applications:
```bash
pnpm build
```

#### Build individual applications:
```bash
# Frontend only
pnpm frontend:build

# Backend only
pnpm backend:build
```

### Deployment

#### Deploy backend to AWS Amplify:
```bash
pnpm backend:deploy
```

## 📦 Available Scripts

- `pnpm dev` - Start both frontend and backend in development mode
- `pnpm build` - Build all applications
- `pnpm lint` - Lint all applications
- `pnpm clean` - Clean all build artifacts
- `pnpm frontend:dev` - Start frontend development server
- `pnpm frontend:build` - Build frontend application
- `pnpm backend:dev` - Start backend development server
- `pnpm backend:build` - Build backend application
- `pnpm backend:deploy` - Deploy backend to AWS Amplify

## 🛠️ Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Spring
- Lucide React

### Backend
- AWS Amplify Gen 2
- NestJS
- TypeScript
- Express

## 📁 Apps

### Frontend (`apps/frontend`)
The main React application with wedding landing page components.

### Backend (`apps/backend`)
AWS Amplify backend with NestJS API functions.

## 🔧 Configuration

- `pnpm-workspace.yaml` - Defines workspace packages
- `.npmrc` - pnpm configuration
- `amplify.yml` - AWS Amplify build configuration

## 🚀 Deployment

The project is configured for deployment on AWS Amplify with:
- Automatic frontend builds from the `apps/frontend` directory
- Backend deployment using AWS Amplify Gen 2
- pnpm workspace support in the build process

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.