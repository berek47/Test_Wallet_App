# Wallet App - Clean Architecture Documentation

## Architecture Overview

This React TypeScript wallet application follows **Clean Architecture** principles, ensuring separation of concerns, maintainability, and testability.

## Project Structure

```
src/
├── domain/              # Business Logic Layer (Core)
│   ├── entities/        # Business entities (Transaction, CardBalance, WalletData)
│   ├── repositories/    # Repository interfaces (ITransactionRepository)
│   └── usecases/        # Business use cases
│       ├── GetWalletDataUseCase.ts
│       ├── GetTransactionByIdUseCase.ts
│       ├── CalculateDailyPointsUseCase.ts
│       └── FormatDateUseCase.ts
│
├── data/                # Data Layer
│   ├── models/          # DTOs (Data Transfer Objects)
│   ├── datasources/     # Data sources (LocalJsonDataSource)
│   └── repositories/    # Repository implementations (TransactionRepositoryImpl)
│
├── presentation/        # Presentation Layer
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components (TransactionsList, TransactionDetail)
│   └── viewmodels/      # View models (hooks for business logic)
│
├── di/                  # Dependency Injection
│   └── Container.ts     # DI container for dependency wiring
│
└── shared/              # Shared utilities
    └── utils/
```

## Architecture Layers

### 1. Domain Layer (Core Business Logic)
**Location:** `src/domain/`

The innermost layer with no dependencies on other layers.

**Entities:**
- `Transaction` - Core transaction entity with type, amount, name, date, status
- `CardBalance` - Card balance information
- `WalletData` - Complete wallet data structure

**Repository Interfaces:**
- `ITransactionRepository` - Defines contract for data access

**Use Cases:**
- `GetWalletDataUseCase` - Retrieves complete wallet data
- `GetTransactionByIdUseCase` - Retrieves single transaction
- `CalculateDailyPointsUseCase` - Calculates daily points using seasonal formula
- `FormatDateUseCase` - Formats dates (day name for last 7 days, formatted date for older)

### 2. Data Layer
**Location:** `src/data/`

Implements domain interfaces and handles data access.

**Models (DTOs):**
- `TransactionDTO` - Data transfer object for transactions
- `WalletDataDTO` - Data transfer object for wallet data

**Data Sources:**
- `LocalJsonDataSource` - Reads data from JSON file

**Repository Implementation:**
- `TransactionRepositoryImpl` - Implements `ITransactionRepository`
- Maps DTOs to domain entities

### 3. Presentation Layer
**Location:** `src/presentation/`

Handles UI and user interactions.

**Components:**
- `TransactionIcon` - Displays transaction icon with random dark background
- `TransactionItem` - Transaction list item component

**Pages:**
- `TransactionsList` - Main page showing wallet overview and transactions
- `TransactionDetail` - Detailed view of a single transaction

**ViewModels:**
- `useWalletViewModel` - Manages wallet list state and business logic
- `useTransactionDetailViewModel` - Manages transaction detail state

### 4. Dependency Injection
**Location:** `src/di/`

**Container:**
- Wires up all dependencies
- Creates singleton instances of data sources, repositories, and use cases
- Ensures proper dependency flow (Domain ← Data ← Presentation)

## Data Flow

```
User Interaction
    ↓
Page Component
    ↓
ViewModel Hook
    ↓
Use Case (Domain)
    ↓
Repository Interface (Domain)
    ↓
Repository Implementation (Data)
    ↓
Data Source (Data)
    ↓
JSON File
```

## Key Features

### Daily Points Calculation
**Seasonal Formula:**
- Day 1 of season: 2 points
- Day 2 of season: 3 points
- Day 3+: (100% previous day) + (60% day before previous)
- Points ≥ 1000 displayed as "K" notation

### Date Formatting
- Last 7 days: Day name (e.g., "Monday")
- Older: Formatted date (e.g., "Sep 15, 2025")

### Transaction Types
- **Payment**: Deposits (shown with +)
- **Credit**: Expenses (shown with -)

### Card Balance
- Max limit: $1,500
- Current balance: Calculated from data
- Available funds: Limit - Balance

## Benefits of Clean Architecture

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Testability**: Business logic can be tested independently
3. **Maintainability**: Changes in one layer don't affect others
4. **Scalability**: Easy to add new features or data sources
5. **Dependency Rule**: Dependencies point inward (Domain has no dependencies)
6. **Framework Independence**: Business logic doesn't depend on UI framework

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **FontAwesome** - Icons
- **CSS Modules** - Component styling

## Testing Strategy

### Unit Tests
- Test use cases independently
- Test repository implementations with mock data sources
- Test view models with mock use cases

### Integration Tests
- Test data flow from components through use cases to repositories
- Test routing between pages

### E2E Tests
- Test complete user workflows
- Test transaction list and detail views

## Future Enhancements

1. Add state management (Redux/Zustand) for complex state
2. Implement API integration (replace JSON with REST/GraphQL)
3. Add authentication and user management
4. Implement search and filtering
5. Add transaction categories and analytics
6. Implement dark mode theme
