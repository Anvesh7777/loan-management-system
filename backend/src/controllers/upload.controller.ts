import { Response } from "express";
import streamifier from "streamifier";

import cloudinary from "../config/cloudinary";
import BorrowerProfile from "../models/BorrowerProfile";
import { AuthRequest } from "../middleware/auth.middleware";

export const uploadSalarySlip = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const profile = await BorrowerProfile.findOne({
      userId: req.user.userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message:
          "Please complete borrower profile first",
      });
    }

    const uploadResult = await new Promise<any>(
      (resolve, reject) => {
        const stream =
          cloudinary.uploader.upload_stream(
            {
              folder: "salary-slips",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

        streamifier
          .createReadStream(file.buffer)
          .pipe(stream);
      }
    );

    profile.salarySlipUrl =
      uploadResult.secure_url;

    profile.salarySlipUploadedAt =
      new Date();

    await profile.save();

    return res.status(200).json({
      success: true,
      message:
        "Salary slip uploaded successfully",
      salarySlipUrl:
        uploadResult.secure_url,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to upload salary slip",
    });
  }
};