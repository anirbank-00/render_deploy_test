import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET!;

function generateToken(userId: string) {
  const payload = {
    userId: userId,
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '1h',
  });

  return token;
}

export default generateToken;
