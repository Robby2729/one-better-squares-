# One Better Squares Pvt. Ltd - Real Estate Platform

A full-stack real estate property listing and lead generation platform.

## Project Structure

- `/frontend` - Contains the HTML, CSS, and JS files for the user interface.
- `/backend` - Node.js Express server handling APIs, authentication, and database interactions.
- `/data` - Local mock data and CSV files for testing (ignored in git).

## Setup Instructions

### Backend
1. Navigate to the `backend/` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on your configuration needs (e.g., MongoDB URI, JWT Secret).
4. Run the server: `npm start` (Runs on port 5000 by default)

### Frontend
1. Open `frontend/index.html` in your browser, or serve it using a local static server (e.g., Live Server in VS Code).
2. The frontend is configured to communicate with the backend at `http://localhost:5000/api` (configurable in `frontend/js/config.js`).

## Features
- **Broker Dashboard:** Manage listings, view incoming leads, and track analytics.
- **Property Listings:** View and search properties with advanced filters.
- **Contact Generation:** Seamless integration for client inquiries and WhatsApp redirects.
