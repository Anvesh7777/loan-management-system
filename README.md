# 🚀 Loan Management System

A full-stack Loan Management System built with **Next.js, TypeScript, Node.js, Express.js, MongoDB, JWT Authentication, and Role-Based Access Control (RBAC)**.

The platform simulates the complete lifecycle of a loan, from borrower onboarding to repayment collection, while providing dedicated dashboards for each operational team.

---

## ✨ Features

### 👤 Borrower Module
- Complete borrower profile creation
- Salary slip upload
- Loan application submission
- Track loan status
- View active and closed loans

### 📈 Sales Module
- View all borrower profiles
- Identify qualified leads
- Track borrower loan pipeline
- Monitor lead conversion status

### ✅ Sanction Module
- Review loan requests
- Approve eligible loans
- Reject applications with reasons
- Monitor pending approvals

### 💰 Disbursement Module
- View sanctioned loans
- Disburse approved loans
- Track disbursed loan portfolio

### 🏦 Collection Module
- Record repayments
- UTR validation
- Outstanding balance tracking
- Automatic loan closure after full repayment

### 📊 Admin Module
- Access all operational modules
- Platform-wide analytics
- Loan lifecycle monitoring
- Collection overview
- Performance dashboards

---

# 🔄 Loan Lifecycle

```text
Borrower
    │
    ▼
Apply Loan
    │
    ▼
Sales Review
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
```

---

# 🛠️ Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Axios

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Zod Validation
- bcryptjs

## DevOps & Tools

- Git
- GitHub
- Postman
- VS Code

---

# 🔐 Role Based Access Control (RBAC)

| Role | Access |
|--------|---------|
| Borrower | Profile, Upload Slip, Apply Loan, Track Loans |
| Sales | View Borrowers & Leads |
| Sanction | Approve / Reject Loans |
| Disbursement | Disburse Approved Loans |
| Collection | Collect Payments |
| Admin | Access All Modules & Analytics |

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
│   │   └── utils
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── services
│   │   ├── store
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

Create `.env`

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=
```

---

## Frontend

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# 📊 Current Functionalities

- Authentication & Authorization
- JWT Protected Routes
- Role Based Dashboards
- Loan Approval Workflow
- Loan Disbursement Workflow
- Payment Collection Workflow
- Automatic Loan Closure
- Sales Lead Tracking
- Admin Analytics Dashboard
- Responsive Modern UI

---

# 🎯 Future Enhancements

- Email Notifications
- SMS Alerts
- Dashboard Charts & Graphs
- EMI Schedule Generation
- File Storage via AWS S3
- Audit Logs
- Export Reports
- Multi-Branch Support
- Real-Time Notifications

---

# 📸 Screenshots

_Add dashboard screenshots here._

---

# 👨‍💻 Author

### Anvesh Mahajan

B.Tech Information Technology  
IIIT Bhopal (2023 – 2027)

- GitHub: https://github.com/Anvesh7777
- LinkedIn: https://www.linkedin.com/in/anvesh77/

---

# ⭐ Project Status

✅ Version 1.1 Complete

- Borrower Flow
- Sales Flow
- Sanction Flow
- Disbursement Flow
- Collection Flow
- Admin Module
- RBAC
- Modern Dashboard UI

🚀 Actively improving analytics and reporting features.