# 🚗 graphql-car-dashboard

A modern, responsive car management application built with React, TypeScript, Apollo GraphQL, and Material-UI.

## 🌟 Features

- **🔍 Advanced Filtering** - Search by model, filter by make, year, and color
- **📱 Responsive Design** - Optimized for mobile, tablet, and desktop
- **🎨 Material-UI** - Beautiful, accessible interface
- **⚡ Performance** - Optimized with React hooks and memoization
- **♿ AODA Compliant** - Fully accessible design
- **🧪 Unit Tests** - Comprehensive test coverage
- **🗂️ State Management** - Efficient filtering and sorting

## 🚀 Live Demo

👉 **[View Live Application]()**

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript
- **Styling:** Material-UI (MUI v5), Emotion
- **GraphQL:** Apollo Client
- **Forms:** React Hook Form + Yup validation
- **Testing:** Vitest, React Testing Library
- **Build:** Vite
- **Deployment:** Vercel

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/marynoroozi/graphql-car-dashboard
cd graphql-car-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:run
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── car/            # Car-specific components
│   └── common/         # Shared components
├── hooks/              # Custom React hooks
├── pages/              # Application pages
├── types/              # TypeScript definitions
├── theme/              # Material-UI theme config
├── mocks/              # MSW mock data
└── graphql/            # GraphQL queries and mutations
```

## ✨ Key Features Implemented

### 🎯 Core Requirements
- ✅ Apollo Client GraphQL integration
- ✅ Responsive image display (mobile/tablet/desktop)
- ✅ Material-UI styled cards
- ✅ Add car form with local state
- ✅ Search and filter functionality
- ✅ Custom `useCars()` hook
- ✅ Unit tests for components

### 🚀 Advanced Features
- ✅ Multi-step form with validation
- ✅ Persistent data storage (localStorage)
- ✅ Advanced filtering hook (`useCarFilters`)
- ✅ Toast notifications
- ✅ Error boundaries
- ✅ Loading states
- ✅ AODA accessibility compliance

## 🎨 Design Decisions

### Performance Optimizations
- Memoized filter and sort operations
- Efficient re-rendering with React.memo
- Optimized Apollo Client caching

### User Experience
- Multi-step form for better UX
- Real-time search and filtering
- Responsive design for all devices
- Toast notifications for user feedback

### Code Quality
- TypeScript for type safety
- Custom hooks for reusability
- Comprehensive error handling
- Clean component architecture

## 🔧 Environment Variables

No environment variables required - uses MSW for mock data.

## 👨‍💻 Author

**[Mary Noroozi]**
- GitHub: [@marynoroozi](https://github.com/marynoroozi)
- LinkedIn: [mary noroozi](https://www.linkedin.com/in/maryam-noroozi-/)

---

*Built with ❤️ for technical assessment*