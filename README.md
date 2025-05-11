# Authenticationapp
A robust full-stack authentication application with a React frontend and a Node.js backend using Express.js. Secure user authentication and authorization are handled using JSON Web Tokens (JWT) and bcrypt for password hashing. The application is developed with TypeScript to ensure type safety and enhanced code quality throughout both the frontend and backend.

## 🔧 Technologies Used
### Frontend:
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend:
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JSON Web Token (JWT)](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)


## 🚀 Features

- User registration (Signup)
- User login
- Password hashing with bcrypt
- Authentication using JWT
- Protected routes
- Clean full-stack folder structure (client/server)

## 📁 Project Structure
```
authenticationapp/
│
├── client/ # Frontend (React + TypeScript)
│ └── ...
│
├── server/ # Backend (Node.js + Express + MongoDB)
│ └── ...
│
├── README.md
└── package.json # Optional root config
```

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
  git clone https://github.com/mahmoudjd/Authenticationapp.git
  cd Authenticationapp
```

### 2. Setup Backend
```bash
   cd server
   npm install
```
Create a .env file inside the server folder:
```
PORT = 3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Then run the backend:

```bash
    npm run start
```
### 3. Setup Frontend
```bash
   cd ../client
   npm install
   npm run dev
```

