# Arvyax Full Stack Internship Assignment

A full-stack session management platform built with the **MERN stack**. Users can register, log in, create/edit/publish wellness sessions.

---

## 🔗 Live Demo

[Live Website](https://arvyax-assignment-1.vercel.app)  
[API Endpoint](https://arvyax-assignment-backend.onrender.com)

- **Register and login for testing or use**: Email: `test@test.com` password: `test1234`

---

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Express.js + MongoDB (Mongoose)
- **Auth**: JWT (Token stored in Local Storage)
- **Deploy**: Vercel (Frontend), Render/Cyclic/Railway (Backend)

---

## Clone & Setup

```bash
clone the repository
cd arvyax-assignment
```

## Backend Setup

### 1. Navigate & Install

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in `/backend` folder

```bash
cp .env.example .env
OR
Manually copy .env.example files into your .env
```

### 3. Run Server

```bash
npm run dev
```

Your backend will be available at:  
`http://localhost:3000/api/v1`

---

## Frontend Setup

### 1. Navigate & Install

```bash
cd frontend
npm install
```

### 2. Environment Variables

Create a `.env` file in `/frontend` folder

```bash
cp .env.example .env
OR
Manually copy .env.example files into your .env
```

### 3. Run Dev Server

```bash
npm run dev
```

Frontend will be available at:  
`http://localhost:5173`

---

## API Documentation

### Auth

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Register new user   |
| POST   | `/login`    | Login and get token |

---

### Sessions

#### Public

| Method | Endpoint    | Description             |
| ------ | ----------- | ----------------------- |
| GET    | `/sessions` | List published sessions |

#### Authenticated

| Method | Endpoint                  | Description                   |
| ------ | ------------------------- | ----------------------------- |
| GET    | `/my-sessions`            | List your sessions            |
| GET    | `/my-sessions/:id`        | Get session by ID             |
| POST   | `/my-sessions/save-draft` | Save draft (create or update) |
| POST   | `/my-sessions/publish`    | Publish a session             |

> All authenticated routes require a valid Bearer token.

---

## Author

Built by **Tewodros**  
[Website](https://tewodros-mengie.vercel.app) [LinkedIn](https://www.linkedin.com/in/tewodros-m-688aa9371) [Email](mailto:tewodrosmengie@gmail.com)

---
