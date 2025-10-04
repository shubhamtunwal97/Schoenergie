# Schoenergie Solar Survey App

A fullstack application combining Challenge A (Next.js Frontend) and Challenge C (NestJS Backend) for a solar panel assessment survey.

## Project Structure

```
├── frontend/                    # Next.js App (Challenge A)
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   ├── components/         # React components
│   │   ├── lib/               # Utilities and validation
│   │   └── types/             # TypeScript types
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/                     # NestJS API (Challenge C)
│   ├── src/
│   │   ├── survey/            # Survey module
│   │   ├── database/          # File-based storage
│   │   └── main.ts
│   ├── test/                  # E2E tests
│   ├── package.json
│   └── tsconfig.json
├── package.json                 # Root package with scripts
└── README.md
```

## Features

### Frontend (Next.js + TypeScript)
-  5-question solar survey form with validation
-  Responsive design with Tailwind CSS
-  Results page with personalized recommendations
-  Optional contact form for follow-up
-  API integration with error handling
-  TypeScript for type safety

### Backend (NestJS + TypeScript)
-  REST API for survey management
-  File-based JSON storage (no database required)
-  Input validation with class-validator
-  Unit tests for all modules
-  E2E tests for API endpoints
-  CORS enabled for frontend integration

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Install Dependencies
```bash
# Install all dependencies for both frontend and backend
npm run install:all

# Or install manually:
cd backend && npm install
cd ../frontend && npm install
```

### 2. Start Development Servers
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start separately:
npm run dev:backend  # Runs on http://localhost:3001
npm run dev:frontend # Runs on http://localhost:3000
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Survey form will be available at the root URL

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/survey/submit` | Submit new survey |
| `GET` | `/api/survey` | Get all surveys |
| `GET` | `/api/survey/:id` | Get survey by ID |
| `DELETE` | `/api/survey/:id` | Delete survey |

### Example API Request
```bash
curl -X POST http://localhost:3001/api/survey/submit \
  -H "Content-Type: application/json" \
  -d '{
    "propertyType": "Einfamilienhaus",
    "roofOrientation": ["Süd", "West"],
    "roofAge": "Unter 5 Jahre",
    "electricityConsumption": "Über 5.000 kWh",
    "interestedInOtherSolutions": "Ja",
    "contactInfo": {
      "name": "Max Mustermann",
      "email": "max@example.com",
      "phone": "+49123456789"
    }
  }'
```

## Testing

### Run Backend Tests
```bash
# Unit tests
npm run test:backend

# E2E tests
npm run test:e2e

# Test coverage
cd backend && npm run test:cov
```

## Survey Questions

1. **Property Type** (Required)
   - Einfamilienhaus, Mehrfamilienhaus, Gewerbeimmobilie

2. **Roof Orientation** (Required, Multiple Choice)
   - Süd, West, Ost, Nord, Keine Angabe

3. **Roof Age** (Required)
   - Unter 5 Jahre, 5–15 Jahre, Über 15 Jahre, Keine Angabe

4. **Annual Electricity Consumption** (Required)
   - Unter 3.000 kWh, 3.000–5.000 kWh, Über 5.000 kWh, Keine Angabe

5. **Interest in Other Energy Solutions** (Required)
   - Ja, Nein, Weiß nicht

6. **Contact Information** (Optional)
   - Name, Email, Phone

## Build for Production

```bash
# Build both frontend and backend
npm run build

# Start production servers
npm run start
```

## Data Storage

Survey data is stored in `backend/data/surveys.json` as a JSON file. Each survey includes:
- Unique ID (UUID)
- All survey responses
- Random recommendation (Ja/Nein)
- Timestamp
- Optional contact information

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Technology Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Hook Form** with Zod validation
- **Responsive design** for mobile/desktop

### Backend
- **NestJS 10** with TypeScript
- **File-based JSON storage**
- **Class Validator** for DTO validation
- **Jest** for testing
- **UUID** for unique IDs

## Challenge Requirements Fulfilled

### Challenge A Requirements 
-  Next.js with App Router and TypeScript
-  5-question survey form with validation
-  Optional contact form
-  API endpoint integration (/api/submit)
-  Random Yes/No recommendation
-  Results page display

### Challenge C Requirements 
-  NestJS backend with TypeScript
-  File-based JSON storage
-  All CRUD endpoints (POST, GET, DELETE)
-  Input validation
-  Unit tests for SurveyModule and DatabaseModule
- 
- End-to-end tests
