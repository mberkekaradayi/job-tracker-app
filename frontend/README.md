This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Job Tracker App - Frontend

A modern job application tracking system built with Next.js to help users organize and monitor their job search process.

## Features

- Job application tracking with the following features:
  - Create and manage job applications with company name and position title
  - Track application status for each job opportunity
  - Record when you applied to each position
  - Star/highlight important job applications
  - View all your job applications in one place
  - Update application details as you progress through interviews
  - Remove applications that are no longer relevant

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) - Component library built on Radix UI
- [React Hook Form](https://react-hook-form.com/) with Zod validation
- [Axios](https://axios-http.com/) for API requests

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The frontend runs on [http://localhost:3001](http://localhost:3001) as configured in package.json.

## API Integration

The frontend communicates with the Ruby on Rails backend API running on port 3000. Make sure to start the backend server before using the application.

### Available Endpoints

The application uses the following API endpoints:

- `GET /job_applications` - Retrieve all job applications
- `GET /job_applications/:id` - Get details for a specific job application
- `POST /job_applications` - Add a new job application
- `PATCH/PUT /job_applications/:id` - Update an existing job application
- `DELETE /job_applications/:id` - Remove a job application

Job applications include company name, position title, application status, application date, and starred status.
