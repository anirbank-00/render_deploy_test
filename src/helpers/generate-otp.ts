import dotenv from "dotenv";
import { authenticator } from "otplib";

dotenv.config();
const OTP_SECRET = process.env.JWT_SECRET!;

// Returns OTP as String
export default function generateOTP(window: number): string {
  // Convert milliseconds to seconds for the 'step'
  const stepInSeconds = Math.floor(window / 1000);

  // Configure otplib to use your custom window size
  authenticator.options = {
    step: stepInSeconds,
  };

  try {
    const otp = authenticator.generate(`${OTP_SECRET}`);
    return otp;
  } catch (error) {
    throw new Error(`OTP Generation Failed: ${error}`);
  }
}
