

import twilio from "twilio"

const clientTwilio = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


export const sendOTP = async (phoneNumber: string, otpNumber: string, type: string = "login") => {
  //Send OTP to user
  const otp = otpNumber

  await clientTwilio.messages.create({
    body: `Thank you for using our service. Your OTP is ${otp}. Don't share it with anyone.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
  return otp;
};