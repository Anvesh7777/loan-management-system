# Loan Management System Backend

## Overview

A role-based Loan Management System (LMS) backend built using Node.js, Express.js, TypeScript, MongoDB, and JWT Authentication.

The system manages the complete loan lifecycle from borrower onboarding to loan closure.

### Features

* JWT Authentication
* Role-Based Access Control (RBAC)
* Borrower Profile Management
* BRE (Business Rule Engine) Validation
* Salary Slip Upload using Cloudinary
* Loan Application Processing
* Loan Sanction Workflow
* Loan Disbursement Workflow
* Collection Management
* Unique UTR Validation
* Auto Loan Closure
* Borrower Dashboard APIs
* Admin Dashboard Statistics

---

## Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT

### Validation

* Zod

### File Upload

* Multer
* Cloudinary

---

## System Roles

The application supports the following roles:

* ADMIN
* BORROWER
* SALES
* SANCTION
* DISBURSEMENT
* COLLECTION

---

## Loan Lifecycle

Borrower Registration/Login

↓

Borrower Profile Creation

↓

BRE Validation

↓

Salary Slip Upload

↓

Loan Application

↓

Loan Sanction

↓

Loan Disbursement

↓

Collection & Payment Tracking

↓

Auto Loan Closure

---

## Project Structure

```text
src
│
├── config
│
├── controllers
│   ├── auth.controller.ts
│   ├── borrower.controller.ts
│   ├── loan.controller.ts
│   ├── upload.controller.ts
│   ├── sanction.controller.ts
│   ├── disbursement.controller.ts
│   ├── collection.controller.ts
│   └── admin.controller.ts
│
├── middleware
│
├── models
│
├── routes
│
├── services
│
├── validators
│
├── seed
│
└── utils
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>

cd backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

### Run Development Server

```bash
npm run dev
```

---

## Seed Default Users

```bash
npm run seed
```

Default users:

| Role         | Email                                               |
| ------------ | --------------------------------------------------- |
| ADMIN        | [admin@lms.com](mailto:admin@lms.com)               |
| SALES        | [sales@lms.com](mailto:sales@lms.com)               |
| SANCTION     | [sanction@lms.com](mailto:sanction@lms.com)         |
| DISBURSEMENT | [disbursement@lms.com](mailto:disbursement@lms.com) |
| COLLECTION   | [collection@lms.com](mailto:collection@lms.com)     |
| BORROWER     | [borrower@lms.com](mailto:borrower@lms.com)         |

---

## Authentication APIs

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Borrower APIs

### Create Borrower Profile

```http
POST /api/borrower/profile
```

### Upload Salary Slip

```http
POST /api/upload/salary-slip
```

### Apply Loan

```http
POST /api/loans/apply
```

### Get My Loans

```http
GET /api/loans/my-loans
```

### Get Loan By ID

```http
GET /api/loans/my-loans/:loanId
```

---

## Sanction APIs

### Get Pending Loans

```http
GET /api/sanction/loans
```

### Approve Loan

```http
PATCH /api/sanction/:loanId/approve
```

### Reject Loan

```http
PATCH /api/sanction/:loanId/reject
```

---

## Disbursement APIs

### Get Sanctioned Loans

```http
GET /api/disbursement/loans
```

### Disburse Loan

```http
PATCH /api/disbursement/:loanId/disburse
```

---

## Collection APIs

### Get Disbursed Loans

```http
GET /api/collection/loans
```

### Collect Payment

```http
POST /api/collection/:loanId/payment
```

---

## Admin APIs

### Dashboard

```http
GET /api/admin/dashboard
```

### Statistics

```http
GET /api/admin/stats
```

---

## Business Rules

### BRE Validation

Loan application is allowed only if:

* Applicant age is 18 years or above
* PAN format is valid
* Monthly salary is greater than 0

### Loan Rules

* Minimum Loan Amount: ₹50,000
* Maximum Loan Amount: ₹5,00,000
* Minimum Tenure: 30 Days
* Maximum Tenure: 365 Days
* Interest Rate: 12%

### Collection Rules

* UTR must be unique
* Payments allowed only for disbursed loans
* Overpayment is not allowed
* Loan automatically closes when outstanding amount becomes zero

---

## Auto Loan Closure

When:

```text
amountPaid >= totalRepayment
```

System automatically:

```text
status = CLOSED
closedAt = current timestamp
```

---

## Future Enhancements

* Email Notifications
* EMI Schedule Generation
* Audit Logs
* Admin Analytics Dashboard
* Frontend Dashboard
* Docker Deployment

---

## Author

Anvesh Mahajan

B.Tech Information Technology

IIIT Bhopal

```
```
