# Accountant’s Society UK  
A modern, professional web platform for the Accountant’s Society UK — built to support members, provide public resources, and maintain dynamic content such as news, blogs, and events.

🌐 **Live Website:** https://accountantssociety.org

---

## 📌 Overview

Accountant’s Society UK is a full-stack web application designed for an organization that helps UK accountants access resources, explore member benefits, read news & events, and manage administrative content using a secure admin panel.

The project is built using **Next.js App Router**, **MongoDB**, **Tailwind CSS**, and follows industry-standard structure, SEO optimization, responsive design, and security best practices.

---

## 🚀 Features

### **Public Website**
- Fully responsive landing page
- About the Society
- Member Benefits page
- Latest News, Blogs & Events
- Find an Accountant section
- Contact page with email integration
- SEO-optimized meta data across the site

### **Member System**
- Email + Password based Sign Up & Sign In
- Server-side validation
- JWT-based secure sessions
- Password reset with token email workflow

### **Admin Panel**
Accessible at: `/admin/signin`

Admin can:
- Add/Delete/Edit **News & Blogs**
- Add/Delete/Edit **News & Events**
- Manage **Homepage Slider** (image + title + caption)
- View and manage records stored in MongoDB

### **Security**
- Password hashing using bcrypt
- JWT-based authentication
- Protected admin-only routes
- Input sanitization

---

## 🧰 Tech Stack

### **Frontend**
- Next.js (App Router)
- React
- Tailwind CSS
- AOS (scroll animations)
- Shadcn components (UI)
- Lucide Icons

### **Backend**
- Next.js API Routes
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Nodemailer (for password reset email)

### **DevOps / Deployment**
- Hosted online (e.g., Vercel)
- Environment variables for backend secrets
- Optimized for performance and SEO

---

## 🗂️ Project Structure

```bash
app/
 ├─ admin/
 │   ├─ signin/
 │   ├─ news-and-events/
 │   ├─ news-and-blogs/
 │   └─ (admin dashboard pages)
 │
 ├─ api/
 │   └─ auth/
 │        ├─ register/
 │        ├─ login/
 │        ├─ reset-password/
 │        └─ verify-token/
 │
 ├─ components/
 ├─ (public pages such as home, about, contact, find-accountant, etc.)
 │
models/
 ├─ NewsAndEvents.ts
 ├─ NewsAndBlogs.ts
 └─ User.ts

public/
 ├─ images/
 └─ uploads/

styles/
 └─ globals.css
