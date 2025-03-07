import * as jwt from 'jsonwebtoken';

// JWT টোকেন জেনারেট করার ফাংশন
export const generateVerificationToken = (userId: string): string => {
  const payload = { userId }; // টোকেনের payload, যেখানে userId রাখা হবে
  const secretKey = process.env.JWT_SECRET_KEY; // পরিবেশ পরিবর্তনশীল থেকে সিক্রেট কী নেয়া

  // secretKey চেক করা এবং টাইপ নিশ্চিত করা
  if (!secretKey) {
    throw new Error('JWT_SECRET_KEY is not defined');
  }

  // SignOptions টাইপ ব্যবহার করে options ডিফাইন করা
  const options: jwt.SignOptions = {
    expiresIn: '1h', // টোকেনের মেয়াদ ১ ঘণ্টা
  };

  // secretKey কে string হিসেবে নিশ্চিত করা
  const token = jwt.sign(payload, secretKey as string, options);
  return token;
};

// Verification Token ভেরিফাই করার ফাংশন
export const verifyVerificationToken = (token: string): any => {
  const secretKey = process.env.JWT_SECRET_KEY;

  // secretKey চেক করা
  if (!secretKey) {
    throw new Error('JWT_SECRET_KEY is not defined');
  }

  try {
    const decoded = jwt.verify(token, secretKey as string);
    return decoded; // টোকেন সঠিক হলে ডিকোডেড তথ্য রিটার্ন করবে
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
