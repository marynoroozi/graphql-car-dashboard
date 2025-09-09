# 🚗 graphql-car-dashboard

A modern, responsive car management application built with React, TypeScript, Apollo GraphQL, Material-UI, and Context API.

## 🌟 Features

- **🔍 Advanced Filtering** - Search by model, filter by make, year, and color
- **📱 Responsive Design** - Optimized for mobile, tablet, and desktop
- **🎨 Material-UI** - Beautiful, accessible interface
- **⚡ Performance** - Optimized with React Context and memoization
- **♿ AODA Compliant** - Fully accessible design
- **🧪 Unit Tests** - Comprehensive test coverage with utils and mocks
- **🗂️ State Management** - Context API for global state management
- **🎯 Multi-step Forms** - Intuitive add car workflow

## 🚀 Live Demo

👉 **[View Live Application](https://codesandbox.io/p/github/marynoroozi/graphql-car-dashboard/main?import=true)**

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript
- **Styling:** Material-UI (MUI v5), Emotion
- **GraphQL:** Apollo Client
- **State Management:** React Context API
- **Forms:** React Hook Form + Yup validation
- **Testing:** Vitest, React Testing Library, Testing Utils
- **Build:** Vite

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
├── __tests__/           # Test files and utilities
├── components/          # Reusable UI components
│   ├── car/            # Car-specific components
│   └── common/         # Shared components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Application pages
├── types/              # TypeScript definitions
├── theme/              # Styles and Material-UI theme config
├── graphql/            # GraphQL queries and mutations
└── mocks/              # MSW mock data
```

## ✨ Key Features Implemented

### 🎯 Core Requirements
- ✅ Apollo Client GraphQL integration
- ✅ Responsive image display (mobile/tablet/desktop)
- ✅ Material-UI styled cards
- ✅ Add car form with local state
- ✅ Search and filter functionality
- ✅ Custom useCars() hook
- ✅ Unit tests for components

### 🚀 Advanced Features
- ✅ Context-based state management (`CarContext`)
- ✅ Test utilities and mock helpers
- ✅ Reusable test wrappers (`FullContextWrapper`)
- ✅ Mock data factories (`createMockCar`, `createMockCars`)
- ✅ Form validation with Yup schemas
- ✅ Toast notifications with react-hot-toast
- ✅ Error boundaries
- ✅ AODA accessibility compliance
- ✅ Responsive grid layouts

### 🧪 Testing Architecture
- ✅ Comprehensive test utilities in `__tests__/utils/`
- ✅ Mock data factories and helpers
- ✅ GraphQL mock providers
- ✅ Context wrapper utilities
- ✅ Component integration tests
- ✅ User interaction testing with userEvent

## 🎨 Design Decisions

### Architecture Improvements
- **Context API Integration**: Centralized state management with `CarContext`
- **Test Infrastructure**: Robust testing utilities and mock system
- **Component Isolation**: Better separation of concerns
- **Type Safety**: Enhanced TypeScript definitions

### Performance Optimizations
- Context-based memoized operations
- Efficient re-rendering with React.memo
- Optimized Apollo Client caching
- Smart component updates

### User Experience
- Multi-step modal forms for better UX
- Real-time search and filtering with context
- Responsive design for all devices
- Toast notifications for user feedback
- Smooth transitions and animations

### Code Quality
- TypeScript for type safety
- Context API for predictable state updates
- Custom hooks for reusability
- Comprehensive test coverage
- Reusable test utilities
- Clean component architecture
- Mock data consistency

## 🔧 Testing Utilities

The project includes comprehensive testing utilities:

### Test Helpers (`__tests__/utils/helpers.ts`)

### Mock Data (`__tests__/utils/mockData.ts`)

### Test Wrappers (`__tests__/utils/testUtils.tsx`)


## 🚦 Environment Variables

No environment variables required - uses MSW for mock data.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**[Mary Noroozi]**
- GitHub: [@marynoroozi](https://github.com/marynoroozi)
- LinkedIn: [mary noroozi](https://www.linkedin.com/in/maryam-noroozi-/)
- GitHub: [@marynoroozi](https://github.com/marynoroozi)
- LinkedIn: [mary noroozi](https://www.linkedin.com/in/maryam-noroozi-/)

