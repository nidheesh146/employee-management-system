# Employee Management System

A dynamic Employee Management System built using React, Django REST Framework, and JWT Authentication.

---

## Features

### Authentication

* User Registration
* JWT Login Authentication
* Access & Refresh Tokens
* Protected APIs

### Dynamic Form Builder

* Create forms dynamically
* Add fields dynamically
* Supported field types:

  * Text
  * Number
  * Date
  * Password
* Drag and Drop field reordering

### Employee Management

* Dynamic Employee Creation
* Dynamic Employee Listing
* Search Employees
* Delete Employees
* Update Employee Data

### API Features

* REST APIs using Django REST Framework
* Axios integration in React
* JWT Protected Routes

---

# Tech Stack

## Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* SQLite/PostgreSQL

## Frontend

* React
* Axios
* Bootstrap
* react-beautiful-dnd

---

# Project Structure

```
employee_management/
│
├── employee_backend/
│   ├── accounts/
│   ├── employee_app/
│   ├── manage.py
│
├── employee-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── Services/
│
└── README.md
```

---

# Backend Setup

## Clone Repository

```bash
git clone <repository-url>
```

## Create Virtual Environment

```bash
python -m venv env
```

## Activate Virtual Environment

### Windows

```bash
env\Scripts\activate
```

### Linux/Mac

```bash
source env/bin/activate
```

---

# Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

# Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

# Start Backend Server

```bash
python manage.py runserver
```

Backend runs on:

```
http://127.0.0.1:8000/
```

---

# Frontend Setup

Go to frontend folder:

```bash
cd employee-frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm start
```

Frontend runs on:

```
http://localhost:3000/
```

---

# JWT Authentication APIs

## Register

```http
POST /api/accounts/register/
```

### Request Body

```json
{
  "username": "john",
  "email": "john@gmail.com",
  "password": "1234"
}
```

---

## Login

```http
POST /api/token/
```

### Request Body

```json
{
  "username": "john",
  "password": "1234"
}
```

### Response

```json
{
  "refresh": "refresh_token",
  "access": "access_token"
}
```

---

# Employee APIs

## Get Employees

```http
GET /api/employees/
```

---

## Create Employee

```http
POST /api/employees/
```

---

## Delete Employee

```http
DELETE /api/employees/<id>/
```

---

# Dynamic Form APIs

## Create Form

```http
POST /api/employees/forms/
```

---

## Get Forms

```http
GET /api/employees/forms/
```

---

# Notes

* Employee forms are generated dynamically from saved form fields.
* Drag and Drop functionality is implemented for form field ordering.
* JWT authentication is required for protected employee APIs.
* Axios is used for frontend-backend communication.

---

# Author

Nidheesh KS
