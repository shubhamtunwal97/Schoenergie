# Schoenergie Backend

A NestJS backend application for the Schoenergie solar survey system.

## Features

- **Survey Management**: Complete CRUD operations for solar energy surveys
- **File-based Storage**: JSON file storage system for survey data
- **Validation**: Full input validation using class-validator
- **CORS Support**: Configured for frontend communication
- **Testing**: Comprehensive unit and E2E tests

## API Endpoints

### Survey Endpoints

- `POST /api/survey/submit` - Submit a new survey
- `GET /api/survey` - Get all surveys
- `GET /api/survey/:id` - Get a specific survey by ID
- `DELETE /api/survey/:id` - Delete a survey by ID

## Survey Data Structure

```typescript
{
  propertyType: 'Einfamilienhaus' | 'Mehrfamilienhaus' | 'Gewerbeimmobilie'
  roofOrientation: Array<'Süd' | 'West' | 'Ost' | 'Nord' | 'Keine Angabe'>
  roofAge: 'Unter 5 Jahre' | '5–15 Jahre' | 'Über 15 Jahre' | 'Keine Angabe'
  electricityConsumption: 'Unter 3.000 kWh' | '3.000–5.000 kWh' | 'Über 5.000 kWh' | 'Keine Angabe'
  interestedInOtherSolutions: 'Ja' | 'Nein' | 'Weiß nicht'
  contactInfo?: {
    name?: string
    email?: string
    phone?: string
  }
}
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Build for production
npm run build
```

## Development

The application runs on `http://localhost:3001` by default with CORS enabled for `http://localhost:3000`.

Survey data is stored in `data/surveys.json` and includes:
- Unique ID generation
- Automatic timestamp
- Random "Ja"/"Nein" recommendation generation
- Full validation of all input fields

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── survey/                 # Survey module
│   ├── dto/               # Data transfer objects
│   ├── survey.controller.ts
│   ├── survey.service.ts
│   └── survey.module.ts
└── database/              # Database module
    ├── database.service.ts
    └── database.module.ts
```