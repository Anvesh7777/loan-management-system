import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../models/User";
import { Role } from "../utils/constants";

const seedUsers = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI as string
    );

    console.log("MongoDB Connected");

    const users = [
      {
        name: "Admin",
        email: "admin@lms.com",
        role: Role.ADMIN,
      },
      {
        name: "Sales Executive",
        email: "sales@lms.com",
        role: Role.SALES,
      },
      {
        name: "Sanction Executive",
        email: "sanction@lms.com",
        role: Role.SANCTION,
      },
      {
        name: "Disbursement Executive",
        email: "disbursement@lms.com",
        role: Role.DISBURSEMENT,
      },
      {
        name: "Collection Executive",
        email: "collection@lms.com",
        role: Role.COLLECTION,
      },
      {
        name: "Borrower",
        email: "borrower@lms.com",
        role: Role.BORROWER,
      },
    ];

    const hashedPassword = await bcrypt.hash(
      "Password@123",
      10
    );

    for (const user of users) {
      const existingUser = await User.findOne({
        email: user.email,
      });

      if (existingUser) {
        console.log(
          `${user.email} already exists`
        );
        continue;
      }

      await User.create({
        ...user,
        password: hashedPassword,
      });

      console.log(
        `${user.email} created successfully`
      );
    }

    console.log("Seeding completed");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedUsers();