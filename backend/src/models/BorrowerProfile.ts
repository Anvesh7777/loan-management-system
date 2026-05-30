import mongoose, { Document, Schema } from "mongoose";
import { EmploymentMode } from "../utils/constants";

export interface IBorrowerProfile extends Document {
  userId: mongoose.Types.ObjectId;

  fullName: string;
  pan: string;
  dateOfBirth: Date;

  monthlySalary: number;

  employmentMode: EmploymentMode;

  salarySlipUrl?: string;
  salarySlipPublicId?: string;
  salarySlipUploadedAt?: Date;
}

const borrowerProfileSchema =
  new Schema<IBorrowerProfile>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      pan: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        unique: true,
      },

      dateOfBirth: {
        type: Date,
        required: true,
      },

      monthlySalary: {
        type: Number,
        required: true,
        min: 0,
      },

      employmentMode: {
        type: String,
        enum: Object.values(EmploymentMode),
        required: true,
      },

      salarySlipUrl: {
        type: String,
      },

      salarySlipPublicId: {
        type: String,
      },

      salarySlipUploadedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

const BorrowerProfile =
  mongoose.model<IBorrowerProfile>(
    "BorrowerProfile",
    borrowerProfileSchema
  );

export default BorrowerProfile;