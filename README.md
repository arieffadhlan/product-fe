# Product Management Mini Project

A modern React.js mini project implementing a complete product management system with authentication, CRUD operations, and responsive design. Built as a technical assessment demonstrating best practices in React development.

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)

## 📁 Project Structure

```
src/
├── common/          # Constants and shared configurations
├── components/      # Reusable UI components
├── config/          # Application configuration files
├── domain/          # Business logic by domain (auth, product)
├── hooks/           # Custom React hooks
├── libs/            # Core libraries and configurations
├── pages/           # Route pages (file-based routing)
├── store/           # Zustand global state stores
├── types/           # Shared TypeScript types
└── utils/           # Helper functions and utilities
```

## ✨ Features

### Authentication
- ✅ Login with DummyJSON API
- ✅ Protected routes (redirect to login if unauthenticated)

### Home Dashboard
- ✅ Welcome message with user's first name and last name

### Product Management (Full CRUD)
- ✅ **List Products**
- ✅ **Search Products**
- ✅ **Sort Products**
- ✅ **Detail Product**
- ✅ **Create Product**
- ✅ **Update Product**
- ✅ **Delete Product**

## ⚠️ Important Note: API Limitations

**DummyJSON API Behavior:**

This project uses [DummyJSON](https://dummyjson.com) as a mock backend API. Please note:

- ✅ **GET requests** (list, detail) work with real data
- ✅ **POST/PUT/DELETE** return success responses with simulated data
- ❌ **Changes are NOT persisted** - the API only simulates CRUD operations

**What this means:**
- Creating a product will show success, but won't appear in the list after refresh
- Updating a product will show success, but changes won't persist
- Deleting a product will show success, but item will still exist on reload

## 🛠️ Tech Stack

### Core
- **React**
- **TypeScript**
- **Vite**

### Routing & Data Fetching
- **React Router**
- **@generouted/react-router**
- **TanStack React Query**
- **Axios**

### State Management
- **Zustand**
- **React Hook Form**

### Validation & Types
- **Valibot**
- **@hookform/resolvers**

### UI & Styling
- **Tailwind CSS**
- **Lucide React**
- **tailwind-merge**

### Storage & Utilities
- **js-cookie**
- **dayjs**
- **uuid**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd product-fe
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open browser at `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run start
```

### Test Credentials

Use any of the DummyJSON test accounts:

| Username | Password | Name |
|----------|----------|------|
| `emilys` | `emilyspass` | Emily Johnson |

[See all test users](https://dummyjson.com/users)


## 🔌 API Integration

### Base URL
- **Development**: Proxied through Vite to avoid CORS
- **Production**: Direct to `https://dummyjson.com`

### Endpoints Used

**Authentication**
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh

**Products**
- `GET /products` - List products (with pagination, search, sort)
- `GET /products/:id` - Get product detail
- `POST /products/add` - Create product (simulated)
- `PUT /products/:id` - Update product (simulated)
- `DELETE /products/:id` - Delete product (simulated)

---