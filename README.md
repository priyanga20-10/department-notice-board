# Department Notice Board

## Project Overview
The Department Notice Board is a web application that allows users to view and add department notices. It uses React with TypeScript for the frontend and Node.js, Express, and MongoDB for the backend.

## Technologies Used
- React
- TypeScript
- Vite
- Node.js
- Express.js
- MongoDB
- Mongoose
- HTML and CSS

## Features
- Welcome page
- Faculty route
- Add notices using a form
- Display notices from MongoDB
- Validate notice title and message
- Display stored notices in a table

## Project Structure
- `server/` – Backend application and MongoDB model
- `client/` – React frontend application

## How to Run

### Backend
1. Open a terminal in the `server` folder.
2. Run `npm install`.
3. Ensure MongoDB is running.
4. Run `node server.js`.

Backend URL: `http://localhost:3000`

### Frontend
1. Open another terminal in the `client` folder.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the URL displayed in the terminal.

## API Endpoints
- `GET /api/notices` – Retrieve all notices
- `POST /api/notices` – Add a notice
- `GET /api/notices/view` – Display notices in an HTML table

## Database
Database: `mydatabase`

Collection: `notices`