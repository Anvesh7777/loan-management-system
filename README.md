# 🚀 Loan Management System

<div align="center">

### End-to-End Loan Lifecycle Management Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Illustrations](https://img.shields.io/badge/Illustrations-unDraw-6C63FF?style=for-the-badge)

A production-style Loan Management System built using **Next.js, TypeScript, Node.js, Express.js, MongoDB, Cloudinary, JWT Authentication, and Role-Based Access Control (RBAC)**.

The platform simulates the complete lifecycle of a loan — from borrower onboarding and document verification to sanction, disbursement, repayment collection, and loan closure.

</div>
🎥 Demo Video

https://youtu.be/nH7QvSiSao8

🚀 Live Demo

https://loan-management-system-five-iota.vercel.app/

📄 Resume

https://drive.google.com/file/d/1dFa81JmgRzgTHALjbulS-aTaVn-tMDjh/view?usp=drive_link

---

# 🎯 Project Overview

Financial institutions process thousands of loan applications every day. Managing the complete lifecycle manually often results in slower approvals, limited visibility, and operational inefficiencies.

This platform digitizes the entire loan journey through dedicated dashboards for operational teams while maintaining strict role-based access controls.

---

# ✨ Features

## 👤 Borrower Module

* Complete borrower profile creation
* Salary slip upload via Cloudinary
* Loan application submission
* Track loan status
* View active and closed loans
* Personalized borrower dashboard

---

## 📈 Sales Module

* View all borrower profiles
* Monitor borrower pipeline
* Track lead conversion
* View complete loan journey
* Monitor application progress
* Sales analytics dashboard

---

## ✅ Sanction Module

* Review pending loan requests
* Approve loan applications
* Reject loan applications
* View borrower financial details
* Manage sanction queue

---

## 💰 Disbursement Module

* View sanctioned loans
* Process loan disbursement
* Track disbursed portfolio
* Monitor loan exposure

---

## 🏦 Collection Module

* Record repayments
* UTR validation
* Outstanding balance tracking
* Auto-close fully repaid loans
* Collection monitoring

---

## 📊 Admin Module

* Access all operational modules
* Platform-wide analytics
* Monitor complete loan pipeline
* Collection overview
* Performance insights
* Administrative control center

---

# 🔄 Loan Lifecycle

```text
Borrower Registration
        │
        ▼
Profile Completion
        │
        ▼
Salary Slip Upload
        │
        ▼
Loan Application
        │
        ▼
Sales Tracking
        │
        ▼
Sanction Team
(Approve / Reject)
        │
        ▼
Disbursement Team
        │
        ▼
Collection Team
        │
        ▼
Loan Closed
```

---

# 🏗️ System Architecture

```text
Frontend (Next.js)
        │
        ▼
REST APIs
        │
        ▼
Backend (Node.js + Express)
        │
        ▼
MongoDB Database
        │
        ▼
Cloudinary Storage
```

---

# 🔐 Role-Based Access Control (RBAC)

| Role         | Responsibilities                                   |
| ------------ | -------------------------------------------------- |
| Borrower     | Profile, Upload Documents, Apply Loan, Track Loans |
| Sales        | Lead Tracking & Borrower Monitoring                |
| Sanction     | Approve / Reject Loans                             |
| Disbursement | Process Loan Disbursement                          |
| Collection   | Collect Repayments                                 |
| Admin        | Analytics + Full System Access                     |

---
# 🔑 Demo Credentials

The project includes a seed script that creates demo users for all supported roles.

Run the seed script:

```bash
npm run seed
```

Use the following credentials to explore different modules:

| Role         | Email                                               | Password     |
| ------------ | --------------------------------------------------- | ------------ |
| Admin        | [admin@lms.com](mailto:admin@lms.com)               | Password@123 |
| Sales        | [sales@lms.com](mailto:sales@lms.com)               | Password@123 |
| Sanction     | [sanction@lms.com](mailto:sanction@lms.com)         | Password@123 |
| Disbursement | [disbursement@lms.com](mailto:disbursement@lms.com) | Password@123 |
| Collection   | [collection@lms.com](mailto:collection@lms.com)     | Password@123 |
| Borrower     | [borrower@lms.com](mailto:borrower@lms.com)         | Password@123 |

> The seed script automatically creates demo users for all supported roles if they do not already exist.
---
# 🛠️ Tech Stack

## Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Zustand
* Axios

---

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Zod Validation
* Cloudinary
* Multer

---

## Tools & DevOps

* Git
* GitHub
* Postman
* VS Code

---

# 📂 Project Structure

```text
loan-management-system
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── validators
│   │   ├── services
│   │   └── utils
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── services
│   │   ├── store
│   │   ├── hooks
│   │   └── types
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Anvesh7777/loan-management-system.git

cd loan-management-system
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

## Backend

Create a `.env` file.

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Frontend

Create a `.env.local` file.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# 📄 Document Management

Documents are uploaded securely using:

* Multer
* Cloudinary

Uploaded salary slips are stored on Cloudinary and linked to borrower profiles.

---

# 📊 Current Functionalities

### Authentication

* User Registration
* User Login
* JWT Authentication

### Borrower

* Profile Creation
* Salary Slip Upload
* Loan Application

### Loan Workflow

* Loan Approval
* Loan Rejection
* Loan Disbursement
* Payment Collection
* Automatic Loan Closure

### Dashboards

* Borrower Dashboard
* Sales Dashboard
* Sanction Dashboard
* Disbursement Dashboard
* Collection Dashboard
* Admin Dashboard

### Security

* Protected Routes
* Role-Based Authorization
* Request Validation
* Secure Password Hashing

---

# 🚀 Future Enhancements

* Advanced Analytics Dashboard
* Interactive Charts & Graphs
* EMI Schedule Generation
* Email Notifications
* SMS Alerts
* Audit Logs
* Export Reports (PDF/Excel)
* Real-Time Notifications
* AWS S3 Support
* Multi-Branch Management

---

# ⭐ Project Status

## Version 1.1

✅ Authentication Complete

✅ Borrower Flow Complete

✅ Sales Pipeline Tracking Complete

✅ Sanction Flow Complete

✅ Disbursement Flow Complete

✅ Collection Flow Complete

✅ Automatic Loan Closure

✅ Admin Analytics Dashboard

✅ Cloudinary Integration Complete

✅ RBAC Implementation Complete

🚀 Currently enhancing analytics, visualizations, and reporting capabilities.

---

# 👨‍💻 Author

## Anvesh Mahajan

B.Tech Information Technology
Indian Institute of Information Technology (IIIT), Bhopal
Batch: 2023 – 2027

### Profiles

GitHub: https://github.com/Anvesh7777

LinkedIn: https://www.linkedin.com/in/anvesh77/

### Skills

C++ • Python • JavaScript • TypeScript • React.js • Next.js • Node.js • Express.js • MongoDB • MySQL • Redis • Docker • AWS • LangChain

---

⭐ If you found this project useful, consider giving it a star.
