import express from "express";

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
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/borrower", borrowerRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/loans", loanRoutes);
app.use(
  "/api/sanction",
  sanctionRoutes
);
app.use(
  "/api/disbursement",
  disbursementRoutes
);
app.use(
  "/api/collection",
  collectionRoutes
);
app.use("/api/sales", salesRoutes);


export default app;