# Deployment Guide

This guide explains how to deploy your MERN stack application.

## 1. Environment Configuration

### Frontend
The frontend now uses `import.meta.env.VITE_API_URL` to connect to the backend.
- **Local Development**: Create a `.env` file in the `frontend` directory:
  ```
  VITE_API_URL=http://localhost:3000
  ```
- **Production**: Set the `VITE_API_URL` environment variable in your hosting provider (e.g., Vercel, Netlify) to your *deployed backend URL*.

### Backend
The backend runs on proper `PORT` provided by the host.
- **Production**: Ensure your hosting provider (e.g., Render, Railway) sets the `PORT` and `MONGODB_URL` environment variables.

## 2. Deploying Backend (e.g., Render.com)
1.  Push your code to GitHub.
2.  Create a new **Web Service** on Render.
3.  Connect your repository.
4.  Root Directory: `backend`
5.  Build Command: `npm install`
6.  Start Command: `node app.js`
7.  **Environment Variables**:
    - `MONGODB_URL`: Your MongoDB connection string.
    - `PORT`: (Render sets this automatically, but good to check).
    - `SECRETKEY`: Your JWT secret.

## 3. Deploying Frontend (e.g., Vercel)
1.  Push your code to GitHub.
2.  Import project into Vercel.
3.  Root Directory: `frontend`
4.  Build Command: `npm run build`
5.  Output Directory: `dist`
6.  **Environment Variables**:
    - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://your-backend.onrender.com`).

## 4. Final Steps
- After deployment, update your Backend `cors` configuration if necessary (some platforms handles this, but sticking to specific origins is safer).
- Currently, `app.js` allows `http://localhost:5173`. For production, you might want to change it to your deployed frontend URL or an array of allowed origins.
  ```javascript
  const allowedOrigins = [
    'http://localhost:5173',
    'https://your-frontend.vercel.app'
  ];
  app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
  }));
  ```
