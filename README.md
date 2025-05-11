# 🏫 School Vaccination Tracker

This is a MEAN stack (MongoDB, Express, Angular, Node.js) application built to help schools manage and track student vaccination records and upcoming vaccination drives.

---

## 🚀 Features

- **Student Management**
  - Add, edit, delete student records
  - Track vaccination history
  - Enroll students in vaccination drives
- **Vaccination Drives**
  - Create and manage vaccination drives
  - View enrolled students per drive
  - Track vaccine types and doses available
- **Excel Integration**
  - Export selected students to Excel
  - Import student data via Excel
- **Filtering & Sorting**
  - Filter students by name, age, class, vaccination, and registration status
- **Responsive UI**
  - Grid layout for student cards
  - Material dialogs for editing and alerts

---

## 🛠️ Tech Stack

- **Frontend:** Angular, Angular Material
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Excel Handling:** `xlsx` (SheetJS)
- **Styling:** SCSS

---

## 📁 Folder Structure

```
school-vaccination-tracker/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/
├── .angular/                     # Angular build info
├── .vscode/                      # VSCode workspace settings
├── node_modules/                 # Project dependencies
├── src/
│   └── app/
│       ├── pages/
│       │   ├── dashboard/              # Dashboard view and logic
│       │   ├── drives-information/     # Vaccination drives list and management
│       │   ├── login/                  # Login page and styling
│       │   └── students-information/   # Student records and enrollment features
│       ├── app-routing.module.ts       # Route definitions
│       ├── app.component.*             # Root component files
│       └── ...                         # Other global modules/services
├── angular.json                   # Angular project configuration
├── package.json                   # Project metadata and scripts
└── README.md                      # Project documentation
```

---

## 🔌 API Endpoints

### 👤 Authentication
- `POST /api/login` – Authenticate admin

### 📚 Students
- `GET /api/students` – Get all students
- `GET /api/students/:id` – Get single student
- `POST /api/students` – Add student
- `PUT /api/students/:id` – Update student
- `DELETE /api/students/:id` – Delete student

### 💉 Vaccination Drives
- `GET /api/drive` – Get all drives
- `POST /api/drive` – Create new drive
- `DELETE /api/drive/:id` – Delete drive

### 📋 Enrollments
- `POST /api/enroll/:studentId` – Enroll a student to upcoming drive

---


## 🧪 Getting Started

### Prerequisites
- Node.js
- Angular CLI
- MongoDB (running locally)

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
ng serve
```

### Access the app at:
```
http://localhost:4200
```

---

## 🔐 Login Details

| Username | Password |
|----------|----------|
| admin    | admin    |

> You can update these in the frontend login component if needed.
