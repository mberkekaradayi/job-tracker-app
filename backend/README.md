# Job Tracker App - Backend API

A Ruby on Rails API backend for the Job Tracker application, providing robust data management and authentication services.

## System Requirements

- Ruby version: 3.4.2
- Rails version: 7.1+ (Rails API mode)
- PostgreSQL: 14.0+
- Node.js (for JavaScript dependencies)

## Setup and Installation

### Clone the repository

```bash
git clone <repository-url>
cd job_tracker_app/backend
```

### Install dependencies

```bash
bundle install
```

### Database setup

Make sure PostgreSQL is running, then execute:

```bash
rails db:create
rails db:migrate
rails db:seed # Optional: loads sample data
```

### Configuration

1. Database configuration is in `config/database.yml`
2. Copy the example environment file and update it with your credentials:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your database credentials and other environment variables

## Running the application

Start the Rails server:

```bash
rails server
# or
rails s
```

The API will be available at [http://localhost:3000](http://localhost:3000)

## API Documentation

The main API endpoints include:

- `/job_applications` - GET: List all job applications
- `/job_applications/:id` - GET: Get a specific job application
- `/job_applications` - POST: Create a new job application
- `/job_applications/:id` - PATCH/PUT: Update a job application
- `/job_applications/:id` - DELETE: Delete a job application

### Job Application Parameters

When creating or updating a job application, you can provide the following parameters:

```json
{
  "job_application": {
    "company_name": "Company Name",
    "position_title": "Position Title",
    "status": "Applied",
    "applied_on": "2023-10-15",
    "starred": false
  }
}
```

For detailed API documentation, access the API directly or refer to the controller files in the codebase.

## Testing

```bash
# Run all tests
rails test

# Run specific test file
rails test test/models/user_test.rb
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
