# Accountants Society UK

A comprehensive web platform for the Accountants Society UK, built to connect accounting professionals, provide resources, and facilitate professional development.

🔗 **Live Site**: [[www.accountantssociety.org](https://www.accountantssociety.org/)]

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)


## 🎯 Overview

The Accountants Society UK platform serves as a central hub for accounting professionals across the United Kingdom. The platform facilitates networking, professional development, resource sharing, and community engagement for accountants at all career stages.

## ✨ Features

### Core Functionality
- **User Authentication & Profiles**: Secure registration and login with comprehensive member profiles
- **Membership Management**: Different membership tiers with associated benefits and privileges
- **Event Management**: Browse, register, and manage professional development events and webinars
- **Resource Library**: Access to articles, guides, templates, and professional resources
- **Discussion Forums**: Community-driven discussions on accounting topics and industry trends
- **News & Updates**: Latest industry news and society announcements
- **CPD Tracking**: Continuous Professional Development hours tracking and certification
- **Networking Directory**: Connect with fellow accounting professionals


### Admin Features
- **Content Management**: Create and manage articles, events, and resources
- **Member Management**: Approve memberships, manage user roles and permissions
- **Analytics Dashboard**: Track member engagement, event attendance, and platform metrics
- **Email Notifications**: Automated member communications and updates

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library for building interactive interfaces
- **Next.js 14** - React framework with server-side rendering and routing
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Shadcn/ui** - Re-usable component library built on Radix UI


### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database toolkit and ORM
- **MongoDB** - Primary database
- **NextAuth.js** - Authentication solution


### Additional Tools
- **AWS S3** - File storage for documents and images
- **Vercel** - Hosting and deployment platform

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL 14.x or higher
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
```bash
git clone [git repo link]
cd accountants-society-uk
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up the database:
```bash
# Create a PostgreSQL database
createdb accountants_society

# Run Prisma migrations
npx prisma migrate dev
```

4. Seed the database (optional):
```bash
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:


## 📁 Project Structure

```
accountants-society-uk/
├── src/app/                # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Member dashboard pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── shared/           # Shared components
├── lib/                   # Utility functions
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database client
│   ├── validations/      # Zod schemas
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Prisma schema
│   └── migrations/       # Database migrations
├── public/               # Static assets
├── styles/               # Global styles
└── types/                # TypeScript type definitions
:
:
:
```



## 📸 Screenshots

Home page: 
<img width="869" height="579" alt="image" src="https://github.com/user-attachments/assets/69650b4c-3b28-461f-9836-e3195cd95ff8" />

About Us:
<img width="884" height="598" alt="image" src="https://github.com/user-attachments/assets/2ae04622-c000-4e17-ad88-038c34b160ba" />
Contact Us:
<img width="878" height="600" alt="image" src="https://github.com/user-attachments/assets/d6cff3f0-d8eb-422a-9b00-a2b32aa2d303" />
Founding Members: 
<img width="876" height="597" alt="image" src="https://github.com/user-attachments/assets/3293c6ef-6d24-46ee-9077-a6708392792c" />



## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 👥 Team

Developed and maintained by me[Nasir-1310].

## 📧 Contact

For questions or support, please contact:
- Email: nasir.iit.du@gmail.com
- Website: [[accountantssociety.org](https://accountantssociety.org)]

---

**Note**: This is a production application. Please ensure all sensitive information is kept secure and never commit API keys or secrets to version control.
