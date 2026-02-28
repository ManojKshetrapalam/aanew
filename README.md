# Aatithya360 AI Travel Planner

A decoupled full-stack application for AI-powered travel planning.

## Tech Stack
- **Backend**: Laravel 11 (API)
- **Frontend**: Next.js 15 (React)
- **Database**: MySQL
- **AI**: OpenAI GPT-4o

## Prerequisites
- PHP 8.2+
- Node.js 20+
- MySQL
- OpenAI API Key

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
composer install
cp .env.example .env
# Update .env with your DB credentials and OPENAI_API_KEY
php artisan key:generate
php artisan migrate --seed --seeder=DemoSeeder
php artisan serve
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Queue Worker (Required for AI generation)
```bash
cd backend
php artisan queue:work
```

## Admin Access
- **URL**: `http://localhost:3000/admin/dashboard`
- **Demo User**: `admin@aatithya360.com` / `password`
