🏫 School Vaccination Tracker

This is a MEAN stack (MongoDB, Express, Angular, Node.js) application built to help schools manage and track student vaccination records and upcoming vaccination drives.

🚀 Features
Student Management

Add, edit, delete student records

Track vaccination history

Enroll students in vaccination drives

Vaccination Drives

Create and manage vaccination drives

View enrolled students per drive

Track vaccine types and doses available

Excel Integration

Export selected students to Excel

Import student data via Excel

Filtering & Sorting

Filter students by name, age, class, vaccination, and registration status

Responsive UI

Grid layout for student cards

Material dialogs for editing and alerts

🛠️ Tech Stack
Frontend: Angular, Angular Material

Backend: Node.js, Express

Database: MongoDB

Excel Handling: xlsx (SheetJS)

Styling: SCSS

📁 Folder Structure
pgsql
Copy
Edit
school-vaccination-tracker/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── app.module.ts
│   └── angular.json
└── README.md
🧪 Getting Started
Prerequisites
Node.js

Angular CLI

MongoDB (running locally)

Backend
bash
Copy
Edit
cd backend
npm install
node server.js
Frontend
bash
Copy
Edit
cd frontend
npm install
ng serve
Access the app at:
arduino
Copy
Edit
http://localhost:4200
🔐 Login Details
Username	Password
admin	admin

You can update these in the frontend login component if needed.
