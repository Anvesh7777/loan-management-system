import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  loanId: mongoose.Types.ObjectId;
  amount: number;
  utrNumber: string;
  paymentDate: Date;
}

const paymentSchema =
  new Schema<IPayment>(
    {
      loanId: {
        type: Schema.Types.ObjectId,
        ref: "Loan",
        required: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 1,
      },

      utrNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      paymentDate: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

const Payment =
  mongoose.model<IPayment>(
    "Payment",
    paymentSchema
  );

export default Payment;