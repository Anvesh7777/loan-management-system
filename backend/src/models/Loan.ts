import mongoose, { Document, Schema } from "mongoose";
import { LoanStatus } from "../utils/constants";

export interface ILoan extends Document {
  borrowerId: mongoose.Types.ObjectId;

  loanAmount: number;
  tenureDays: number;

  interestRate: number;

  simpleInterest: number;
  totalRepayment: number;

  amountPaid: number;

  status: LoanStatus;

  rejectionReason?: string;

  sanctionedAt?: Date;
  disbursedAt?: Date;
  closedAt?: Date;
}

const loanSchema = new Schema<ILoan>(
  {
    borrowerId: {
      type: Schema.Types.ObjectId,
      ref: "BorrowerProfile",
      required: true,
    },

    loanAmount: {
      type: Number,
      required: true,
      min: 50000,
      max: 500000,
    },

    tenureDays: {
      type: Number,
      required: true,
      min: 30,
      max: 365,
    },

    interestRate: {
      type: Number,
      required: true,
      default: 12,
    },

    simpleInterest: {
      type: Number,
      required: true,
    },

    totalRepayment: {
      type: Number,
      required: true,
    },

    amountPaid: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: Object.values(LoanStatus),
      default: LoanStatus.PENDING,
    },

    rejectionReason: {
      type: String,
    },

    sanctionedAt: {
      type: Date,
    },

    disbursedAt: {
      type: Date,
    },

    closedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.model<ILoan>(
  "Loan",
  loanSchema
);

export default Loan;