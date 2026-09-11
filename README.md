# Project-01
This is my first website, which is a clone of Airbnb.

## Run locally

1. Install the dependencies:

```bash
npm install
```

2. Start MongoDB locally. The application connects to `WebDatabase` on the default MongoDB port.

3. Start the development server:

```bash
npm run dev
```

4. Open <http://localhost:8080> in a browser.

## Project structure

- `app.js` - Express application setup and database connection
- `routes/` - Listing and review request handlers
- `models/` - Mongoose schemas
- `views/` - EJS pages and shared layout files
- `public/` - Browser-side JavaScript and CSS
- `init/` - Seed data and database initialization helpers
