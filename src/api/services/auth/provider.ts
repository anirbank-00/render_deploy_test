import dotenv from 'dotenv';
import { Request, Response } from 'express';
import connection from '../../../utils/db-connect';
import { Otp } from '../../../models/otp.model';
import { User } from '../../../models/user.model';
import { UserRole } from '../../../constants/user-constants';
import generateToken from '../../../helpers/generate-jwt';
import isValidPhoneNumber from '../../../helpers/phone-number-validator';
import generateOTP from '../../../helpers/generate-otp';

dotenv.config();

// Model Initialization
const otpRepository = connection.getRepository(Otp);
const userRepository = connection.getRepository(User);

export const loginProvider = async (req: Request, res: Response) => {
  // Front-end needs to send the data as JSON with 'phoneNumber' key
  // For example: {"phoneNumber": "9163312312"}
  const phoneNumber = req.body.phoneNumber;

  if (!isValidPhoneNumber(phoneNumber))
    return res.status(400).json({ error: 'Invalid phone number.' });

  //Check entry exists in OTP Table or not
  let otp = await otpRepository.findOneBy({ phoneNumber: phoneNumber });
  if (otp) {
    otp.otpCode = generateOTP(5 * 60 * 1000);
    otp.expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    await otpRepository.save(otp);
  } else {
    otp = otpRepository.create({
      phoneNumber: phoneNumber,
      otpCode: generateOTP(5 * 60 * 1000),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
    });
    await otpRepository.save(otp);
  }

  return res.json({
    status: true,
    otp: otp.otpCode,
  });
};

export const validate = async (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;

  if (!isValidPhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number.' });
  }

  if (!otp) {
    return res.status(400).json({ error: 'Please enter an OTP.' });
  }

  //Check entry exists in OTP Table or not
  const otpExists = await otpRepository
    .createQueryBuilder('otp')
    .where('otp.phoneNumber = :phoneNumber', { phoneNumber })
    .andWhere('otp.otpCode = :otpCode', { otpCode: otp })
    .andWhere('otp.expiresAt > :now', { now: new Date() })
    .getOne();

  // Check if OTP exists or not
  if (otpExists) {
    const provider = await userRepository.findOneBy({
      phoneNumber: phoneNumber,
      role: UserRole.Provider,
    });
    if (!provider) {
      return res.json({
        otpValidated: true,
        providerExists: false,
        status: true,
      });
    }
    const token = generateToken(provider.id);
    return res.json({
      otpValidated: true,
      providerExists: true,
      status: true,
      token: token,
    });
  } else {
    return res.json({
      otpValidated: false,
      status: false,
      message: 'OTP expired or it does not match.',
    });
  }
};

export const registerProvider = async (req: Request, res: Response) => {
  const { firstName, lastName, phoneNumber, age, sex, address } = req.body;

  if (!isValidPhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number.' });
  }

  if (!firstName) {
    return res.status(400).json({ error: 'Please enter your first name' });
  }

  if (!lastName) {
    return res.status(400).json({ error: 'Please enter your last name' });
  }

  if (!age) {
    return res.status(400).json({ error: 'Please enter an age.' });
  }

  if (!sex) {
    return res.status(400).json({ error: 'Please select your sex.' });
  }

  if (!address) {
    return res.status(400).json({ error: 'Please enter your address.' });
  }

  // Check if provider exists or not
  let provider = await userRepository.findOneBy({
    phoneNumber: phoneNumber,
    role: UserRole.Provider,
  });
  if (!provider) {
    provider = userRepository.create({
      firstName,
      lastName,
      phoneNumber,
      age,
      sex,
      address,
      role: UserRole.User,
    });
    await userRepository.save(provider);

    const token = generateToken(provider.id);

    return res.json({
      otpValidated: true,
      providerExists: true,
      token: token,
      status: true,
    });
  } else {
    return res.json({
      status: false,
      message: 'Provider already exists.',
    });
  }
};
