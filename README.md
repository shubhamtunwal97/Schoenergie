# Schoenergie Solar Survey App

Eine Fullstack-Anwendung, die Challenge A (Next.js Frontend) und Challenge C (NestJS Backend) für eine Solarpanel-Bewertungsumfrage kombiniert.

## Projektstruktur

```
├── frontend/                    # Next.js App (Challenge A)
│   ├── src/
│   │   ├── app/                # App Router Seiten
│   │   ├── components/         # React Komponenten
│   │   ├── lib/               # Utilities und Validierung
│   │   └── types/             # TypeScript Typen
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/                     # NestJS API (Challenge C)
│   ├── src/
│   │   ├── survey/            # Survey Modul
│   │   ├── database/          # Dateibasierte Speicherung
│   │   └── main.ts
│   ├── test/                  # E2E Tests
│   ├── package.json
│   └── tsconfig.json
├── package.json                 # Root Package mit Scripts
└── README.md
```

## Funktionen

### Frontend (Next.js + TypeScript)
- 5-Fragen Solar-Umfrage-Formular mit Validierung
- Responsive Design mit Tailwind CSS
- Ergebnisseite mit personalisierten Empfehlungen
- Optionales Kontaktformular für Nachfragen
- API-Integration mit Fehlerbehandlung
- TypeScript für Typsicherheit

### Backend (NestJS + TypeScript)
- REST API für Umfrage-Management
- Dateibasierte JSON-Speicherung (keine Datenbank erforderlich)
- Input-Validierung mit class-validator
- Unit Tests für alle Module
- E2E Tests für API-Endpunkte
- CORS aktiviert für Frontend-Integration

## Schnellstart

### Voraussetzungen
- Node.js 18+
- npm oder yarn

### 1. Abhängigkeiten installieren
```bash
# Alle Abhängigkeiten für Frontend und Backend installieren
npm run install:all

# Oder manuell installieren:
cd backend && npm install
cd ../frontend && npm install
```

### 2. Entwicklungsserver starten
```bash
# Frontend und Backend gleichzeitig starten
npm run dev

# Oder separat starten:
npm run dev:backend  # Läuft auf http://localhost:3001
npm run dev:frontend # Läuft auf http://localhost:3000
```

### 3. Anwendung aufrufen
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Umfrage-Formular ist unter der Root-URL verfügbar

## API Endpunkte

| Methode | Endpunkt | Beschreibung |
|---------|----------|---------------|
| `POST` | `/api/survey/submit` | Neue Umfrage einreichen |
| `GET` | `/api/survey` | Alle Umfragen abrufen |
| `GET` | `/api/survey/:id` | Umfrage nach ID abrufen |
| `DELETE` | `/api/survey/:id` | Umfrage löschen |

### Beispiel API Anfrage
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

## Tests

### Backend Tests ausführen
```bash
# Unit Tests
npm run test:backend

# E2E Tests
npm run test:e2e

# Test Coverage
cd backend && npm run test:cov
```

## Umfrage-Fragen

1. **Immobilientyp** (Pflichtfeld)
   - Einfamilienhaus, Mehrfamilienhaus, Gewerbeimmobilie

2. **Dachausrichtung** (Pflichtfeld, Mehrfachauswahl)
   - Süd, West, Ost, Nord, Keine Angabe

3. **Dachalter** (Pflichtfeld)
   - Unter 5 Jahre, 5–15 Jahre, Über 15 Jahre, Keine Angabe

4. **Jährlicher Stromverbrauch** (Pflichtfeld)
   - Unter 3.000 kWh, 3.000–5.000 kWh, Über 5.000 kWh, Keine Angabe

5. **Interesse an anderen Energielösungen** (Pflichtfeld)
   - Ja, Nein, Weiß nicht

6. **Kontaktinformationen** (Optional)
   - Name, E-Mail, Telefon

## Produktions-Build

```bash
# Frontend und Backend für Produktion bauen
npm run build

# Produktionsserver starten
npm run start
```

## Datenspeicherung

Umfrage-Daten werden in `backend/data/surveys.json` als JSON-Datei gespeichert. Jede Umfrage enthält:
- Eindeutige ID (UUID)
- Alle Umfrage-Antworten
- Zufällige Empfehlung (Ja/Nein)
- Zeitstempel
- Optionale Kontaktinformationen

## Umgebungsvariablen

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Technologie-Stack

### Frontend
- **Next.js 14** mit App Router
- **React 18** mit TypeScript
- **Tailwind CSS** für Styling
- **React Hook Form** mit Zod Validierung
- **Responsive Design** für Mobil/Desktop

### Backend
- **NestJS 10** mit TypeScript
- **Dateibasierte JSON-Speicherung**
- **Class Validator** für DTO-Validierung
- **Jest** für Tests
- **UUID** für eindeutige IDs

## Erfüllte Challenge-Anforderungen

### Challenge A Anforderungen
- Next.js mit App Router und TypeScript
- 5-Fragen Umfrage-Formular mit Validierung
- Optionales Kontaktformular
- API-Endpunkt Integration (/api/submit)
- Zufällige Ja/Nein Empfehlung
- Ergebnisseiten-Anzeige

### Challenge C Anforderungen
- NestJS Backend mit TypeScript
- Dateibasierte JSON-Speicherung
- Alle CRUD-Endpunkte (POST, GET, DELETE)
- Input-Validierung
- Unit Tests für SurveyModule und DatabaseModule
- End-to-End Tests
