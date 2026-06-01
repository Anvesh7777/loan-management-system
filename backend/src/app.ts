import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import adminRoutes from "./routes/admin.routes";
import borrowerRoutes from "./routes/borrower.routes";
import uploadRoutes from "./routes/upload.routes";
import loanRoutes from "./routes/loan.routes";
import sanctionRoutes from "./routes/sanction.routes";
import disbursementRoutes from "./routes/disbursement.routes";
import collectionRoutes from "./routes/collection.routes";
import salesRoutes from "./routes/sales.routes";

import {
  authLimiter,
  apiLimiter,
} from "./middleware/rateLimit.middleware";

const app = express();

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authLimiter);
app.use("/api", apiLimiter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CreditSea Loan Management API",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/borrower", borrowerRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/sanction", sanctionRoutes);
app.use(
  "/api/disbursement",
  disbursementRoutes
);
app.use(
  "/api/collection",
  collectionRoutes
);
app.use("/api/sales", salesRoutes);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;