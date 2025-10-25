# ⚡️ ENERGIE FULL-STACK DATABASE MANAGEMENT APP ⚡️  

A robust, **MERN-lite** (MySQL, Express, React, Node.js) application designed for efficient and secure management of relational data.  
This project showcases **state-of-the-art security**, **clean architecture**, and **rapid deployment capabilities**.  

---

## 🚀 Architectural Overview  

This application follows a clean, decoupled architecture:  
A modern **Single Page Application (SPA)** on the frontend communicates solely with a dedicated **RESTful API** on the backend.  

---

## 🛠️ Technology Stack  

| Layer | Technology | Role |
|:------|:------------|:------|
| 🎨 Frontend | **React** | Dynamic user interface; managed by `npm start`. |
| ⚙️ Backend | **Node.js / Express** | RESTful API server, handles business logic and security. |
| 🗄️ Database | **MySQL** | Persistent, relational data storage via XAMPP/WAMP. |
| 🔄 HTTP Client | **Axios** | Used by React for making clean, promise-based requests to the backend API. |

---

## 🔒 Security & Interoperability Highlights  

- **JWT Web Token System:**  
  Implements **JSON Web Tokens (JWT)** for client authentication, ensuring stateless, secure sessions with token validation on protected routes.  

- **CORS Configuration:**  
  Explicit **CORS (Cross-Origin Resource Sharing)** rules enable safe, structured communication between the React frontend and the Express backend.  

---

## ▶️ Quick Start Guide

Follow these steps to get both the **Backend API** and the **React Frontend** running simultaneously.

### 🧰 Prerequisites
- **Node.js** installed on your system.  
- A running **MySQL environment** (e.g., XAMPP or WAMP) for the database.

---

### 🗄️ Step 1: Start the Database
1. Launch **XAMPP/WAMP** or your preferred database manager.  
2. Ensure **Apache** and **MySQL** services are running.

---

### ⚙️ Step 2: Launch the Backend API

```bash
# Navigate to the backend directory
cd backend

# Install all required Node dependencies
npm install

# Start the Express server in development mode
npm run dev
```
The backend server will run on **port 5050**.

### 🎨 Step 3: Launch the React Frontend

```bash
# Open a new terminal tab and navigate to the frontend directory
cd ../frontend

# Install all required React dependencies
npm install

# Start the React application
npm start
```
The frontend will automatically open in your browser, typically on **port 3000**.

Enjoy! 🎉
