# Password Analyzer

A web-based password analysis tool that evaluates password strength, provides suggestions, and stores analysis history.

## Features

- **Password Strength Analysis**: Checks length, character variety (uppercase, lowercase, numbers, special characters)
- **Strength Categories**: Weak, Moderate, Strong
- **Suggestions**: Provides recommendations for stronger passwords
- **Password Visibility Toggle**: Eye icon to show/hide password
- **Database Storage**: All analyzed passwords stored via Prisma ORM

## Tech Stack

- TypeScript
- Express.js
- Prisma (PostgreSQL compatible)
- bcryptjs (password hashing)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to use the password analyzer.

## Deployment on Render

1. Push this repository to GitHub
2. Go to [Render](https://render.com) and create a new Web Service
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` configuration
5. The PostgreSQL database will be auto-provisioned via Render

### Manual Deployment

If deploying manually to another platform:

1. Create a PostgreSQL database
2. Set `DATABASE_URL` environment variable:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
   ```
3. Build command: `npm install`
4. Start command: `npm start`

## API

POST `/api/analyze` - Analyze a password

**Request:**
```json
{
  "password": "your_password_here"
}
```

**Response:**
```json
{
  "password": "your_password_here",
  "strength": 4,
  "category": "Strong",
  "reuse": false,
  "suggestions": ["suggestion1", "suggestion2"]
}
```

## Scripts

- `npm run dev` - Start development server
- `npm run start` - Start production server
- `npm run migrate` - Deploy database migrations
- `npm run generate` - Generate Prisma client