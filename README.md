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
- Prisma (SQLite)
- bcryptjs (password hashing)

## Getting Started

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to use the password analyzer.

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
- `npm run migrate` - Run database migrations
- `npm run generate` - Generate Prisma client

- ## Screenshots

### Home Page

![Home Page](Homepage.png)

### Password Analysis Result

![Password Analysis Result](Password%20Result.png)

### Prisma Database Storage

![Prisma Database Storage](Prisma%20Studio.png)


## Author

Abhinav Kommu

B.Tech CSE (AI & ML)

Password Analyzer project developed using TypeScript, Express.js, Prisma ORM, SQLite, and bcryptjs.
