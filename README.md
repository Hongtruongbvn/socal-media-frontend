<img width="2549" height="1305" alt="image" src="https://github.com/user-attachments/assets/a4d8cfe3-54e1-4c3a-b18b-15f9133254c8" />
<img width="2559" height="1381" alt="image" src="https://github.com/user-attachments/assets/ae941c89-821b-48f6-b22e-13593b85781f" />
<img width="2552" height="1305" alt="image" src="https://github.com/user-attachments/assets/3ccd06b9-acf3-4a2e-a1bf-9c22ad19651d" />
Socal Media Frontend
Overview

This project is the frontend application for the Socal Media social networking platform.
It provides a modern and interactive user interface for users to connect, share posts, communicate in real-time, join communities, and interact with AI-powered features.

The frontend works together with the backend API service to deliver a complete social media experience.


Backend API:https://socal-media-backend-qh5r.onrender.com/
Socal Media Backend API

Important Notice

Because the backend API is deployed separately on Render free hosting, the server may go into sleep mode after a period of inactivity.

Before using the frontend application, please open the backend API link first to wake up the server:

Wake Up Backend Server

After the backend is active, the frontend will function normally.

Features
Social Features
Create and manage posts
Like, comment, and repost posts
Friend request and follow system
Real-time messaging
Notifications system
Story sharing
Community Features
Group and community management
Chatroom support
Member invitations and moderation
AI Features
AI chatbot integration
Smart user interactions
Media Features
Image uploads
User profile customization
Responsive modern UI
Payment Features
Stripe payment integration
Coin and item purchasing system
Tech Stack
Frontend
React
TypeScript
Vite
SCSS
Axios
React Router
Backend Integration
NestJS API
MongoDB
JWT Authentication
Stripe API
Google AI API
Environment Variables

Create a .env file in the root directory and configure your environment variables like the example below:

VITE_API_BASE_URL=your_backend_api_url
VITE_API_STATIC_URL=your_backend_static_url
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

Example:

VITE_API_BASE_URL=https://socal-media-backend-qh5r.onrender.com/api
VITE_API_STATIC_URL=https://socal-media-backend-qh5r.onrender.com
VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key
Installation

Clone the repository:

git clone https://github.com/Hongtruongbvn/socal-media-frontend.git

Install dependencies:

npm install

Run the development server:

npm run dev
Build for Production
npm run build
System Benefits
Modern and responsive social media interface
Real-time communication experience
Interactive and community-focused platform
AI-powered user support
Integrated payment and digital item system
Future Improvements
Mobile application support
Video call integration
Advanced AI recommendation system
Real-time live streaming
Improved performance optimization
Deployment 
https://socal-media-frontend.vercel.app/
GitHub Repository

Backend Deployment:https://socal-media-backend-qh5r.onrender.com/
Backend API Deployment 
