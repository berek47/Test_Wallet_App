# Wallet App - React TypeScript with Clean Architecture

A modern mobile wallet application built with React, TypeScript, and Clean Architecture principles.

## Features

- View card balance and available funds
- Track daily points with seasonal calculation
- Browse transaction history
- View detailed transaction information
- Mobile-first responsive design
- Clean Architecture implementation

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser at http://localhost:5173/
```

## Project Structure

```
src/
├── domain/          # Business logic & entities (no dependencies)
├── data/            # Data access & repositories
├── presentation/    # UI components & pages
├── di/              # Dependency injection
└── shared/          # Shared utilities
```

## Architecture

This project follows **Clean Architecture** principles:

- **Domain Layer**: Core business logic, entities, and use cases
- **Data Layer**: Repository implementations and data sources
- **Presentation Layer**: React components, pages, and view models
- **Dependency Injection**: Container for wiring dependencies

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **React Router** for navigation
- **FontAwesome** for icons
- **CSS** for styling

## Key Features

### Daily Points Calculation
Points calculated using seasonal formula:
- Day 1: 2 points
- Day 2: 3 points
- Day 3+: Previous day + (60% × day before previous)

### Transaction Management
- 10 sample transactions
- Payment and Credit types
- Status tracking (Completed/Pending)
- Cashback percentage
- Authorized user tracking

### Mobile-First Design
- Responsive layout (max-width: 428px)
- Touch-friendly interface
- Smooth animations

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Development

The app uses Clean Architecture, making it:
- **Testable**: Business logic isolated from UI
- **Maintainable**: Clear separation of concerns
- **Scalable**: Easy to add features or swap implementations
- **Independent**: Business logic doesn't depend on frameworks

## Screenshots

The app includes two main screens:

1. **TransactionsList**: Displays card balance, daily points, and transaction history
2. **TransactionDetail**: Shows detailed information for a selected transaction

## License

MIT
