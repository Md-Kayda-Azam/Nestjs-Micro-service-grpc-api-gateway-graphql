const nodemailer = require('nodemailer'); // Using CommonJS as resolved earlier

export const sendVerificationEmail = async (
  email: string,
  firstName: string,
  verificationLink: string,
): Promise<void> => {
  try {
    if (!nodemailer || typeof nodemailer.createTransport !== 'function') {
      throw new Error('Nodemailer module is not properly imported');
    }

    const mailHost = process.env.MAIL_HOST;
    const mailPort = parseInt(process.env.MAIL_PORT || '587', 10);
    const mailUser = process.env.MAIL_ID;
    const mailPass = process.env.PASSWORD;

    if (!mailHost || !mailPort || !mailUser || !mailPass) {
      throw new Error('Missing email configuration in environment variables');
    }

    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailPort === 465,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    const mailOptions = {
      from: '"School Management" <kaydaazamgamer1@gmail.com>',
      to: email,
      subject: 'Login Credentials for School Management',
      html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Journey Starts Here!</title>
  <style>
    body {
      font-family: 'Helvetica', Arial, sans-serif;
      background-color: #f0f2f5;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 650px;
      margin: 30px auto;
      background: linear-gradient(135deg, #ffffff, #f9f9f9);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #4a90e2;
      color: white;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }
    .content {
      padding: 30px;
      line-height: 1.7;
    }
    .highlight {
      background-color: #e8f0fe;
      padding: 15px;
      border-left: 4px solid #4a90e2;
      border-radius: 5px;
      margin: 15px 0;
    }
    .btn {
      display: inline-block;
      padding: 12px 25px;
      background-color: #4a90e2;
      color: white;
      text-decoration: none;
      border-radius: 25px;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    .btn:hover {
      background-color: #357abd;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #777;
      background-color: #fafafa;
      border-top: 1px solid #eee;
    }
    .footer a {
      color: #4a90e2;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your Journey Starts Here!</h1>
    </div>
    <div class="content">
      <p>Hello ${firstName},</p>
      <p>Welcome aboard! We’re thrilled to have you join the School Management System family. Your account is ready, and here’s everything you need to get started:</p>
      <div class="highlight">
        <p><strong>Your Email:</strong> ${email}</p>
        <p><strong>Your Password:</strong> ${verificationLink}</p>
      </div>
      <p>Dive in now by clicking the button below:</p>
      <p style="text-align: center;">
        <a href="https://www.jknextsm.com/${verificationLink}" class="btn">Log In to Your Account</a>
      </p>
      <p>Keep your credentials safe and secure. If this wasn’t you, no worries—just let this email pass by.</p>
      <p>Looking forward to seeing you thrive!</p>
      <p>Warmest regards,</p>
      <p><strong>The School Management Crew</strong></p>
    </div>
    <div class="footer">
      <p>Need help? <a href="mailto:support@jknextsm.com">Contact us</a> anytime!</p>
      <p>© 2025 School Management System. Made with care.</p>
    </div>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

export const sendResetEmail = async (
  email: string,
  firstName: string,
  resetLink: string,
): Promise<void> => {
  try {
    if (!nodemailer || typeof nodemailer.createTransport !== 'function') {
      throw new Error('Nodemailer module is not properly imported');
    }

    const mailHost = process.env.MAIL_HOST;
    const mailPort = parseInt(process.env.MAIL_PORT || '587', 10);
    const mailUser = process.env.MAIL_ID;
    const mailPass = process.env.PASSWORD;

    if (!mailHost || !mailPort || !mailUser || !mailPass) {
      throw new Error('Missing email configuration in environment variables');
    }

    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailPort === 465,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    const mailOptions = {
      from: '"School Management" <kaydaazamgamer1@gmail.com>',
      to: email,
      subject: 'Reset Your School Management Password',
      html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: 'Helvetica', Arial, sans-serif;
      background-color: #f0f2f5;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 650px;
      margin: 30px auto;
      background: linear-gradient(135deg, #ffffff, #f9f9f9);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #4a90e2;
      color: white;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }
    .content {
      padding: 30px;
      line-height: 1.7;
    }
    .highlight {
      background-color: #e8f0fe;
      padding: 15px;
      border-left: 4px solid #4a90e2;
      border-radius: 5px;
      margin: 15px 0;
    }
    .btn {
      display: inline-block;
      padding: 12px 25px;
      background-color: #4a90e2;
      color: white;
      text-decoration: none;
      border-radius: 25px;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    .btn:hover {
      background-color: #357abd;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #777;
      background-color: #fafafa;
      border-top: 1px solid #eee;
    }
    .footer a {
      color: #4a90e2;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Hello ${firstName},</p>
      <p>We received a request to reset your password for the School Management System. No worries—we’ve got you covered! Click the button below to set a new password:</p>
      <p style="text-align: center;">
        <a href="${resetLink}" class="btn">Reset Your Password</a>
      </p>
      <div class="highlight">
        <p><strong>Link Expires:</strong> This link is valid for 24 hours.</p>
      </div>
      <p>If you didn’t request this reset, feel free to ignore this email—your account remains secure.</p>
      <p>Need assistance? We’re here for you!</p>
      <p>Best regards,</p>
      <p><strong>The School Management Crew</strong></p>
    </div>
    <div class="footer">
      <p>Need help? <a href="mailto:support@jknextsm.com">Contact us</a> anytime!</p>
      <p>© 2025 School Management System. Made with care.</p>
    </div>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error('Error sending reset email:', error);
    throw new Error(`Failed to send reset email: ${error.message}`);
  }
};

export const sendVerificationOTPEmail = async (
  toEmail: string,
  otp: string,
  name: string,
): Promise<void> => {
  try {
    if (!nodemailer || typeof nodemailer.createTransport !== 'function') {
      throw new Error('Nodemailer module is not properly imported');
    }

    const mailHost = process.env.MAIL_HOST;
    const mailPort = parseInt(process.env.MAIL_PORT || '587', 10);
    const mailUser = process.env.MAIL_ID;
    const mailPass = process.env.PASSWORD;

    if (!mailHost || !mailPort || !mailUser || !mailPass) {
      throw new Error('Missing email configuration in environment variables');
    }

    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailPort === 465,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    const mailOptions = {
      from: '"School Management" <kaydaazamgamer1@gmail.com>',
      to: toEmail,
      subject: 'Login Credentials for School Management',
      html: `
      <p>Dear ${name},</p>
      <p>Welcome to the School Management System!</p>
      <p>To verify your email, please use the following information:</p>
      <p><strong>Email:</strong> ${toEmail}</p>
      <p><strong>OTP:</strong> ${otp}</p>
      <p>Use this OTP to verify your email in our system. The OTP is valid for 5 minutes.</p>
      <p>Keep this information secure and do not share it with others. If you didn’t request this, please ignore this email.</p>
      <p>Best Regards,</p>
      <p><strong>School Management Team</strong></p>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${toEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

export const sendSecurityAlertEmail = async (
  email: string,
  location: string,
  ipAddress: string,
  userAgent: string,
): Promise<void> => {
  try {
    if (!nodemailer || typeof nodemailer.createTransport !== 'function') {
      throw new Error('Nodemailer module is not properly imported');
    }

    const mailHost = process.env.MAIL_HOST;
    const mailPort = parseInt(process.env.MAIL_PORT || '587', 10);
    const mailUser = process.env.MAIL_ID;
    const mailPass = process.env.PASSWORD;

    if (!mailHost || !mailPort || !mailUser || !mailPass) {
      throw new Error('Missing email configuration in environment variables');
    }

    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailPort === 465,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    // Updated email content
    const mailOptions = {
      from: '"Security Alert" <kaydaazamgamer1@gmail.com>', // From your email
      to: email, // Email to send the alert
      subject: 'New Login Detected',
      html: `
      <p>Dear User,</p>
      <p>We detected a new login to your account from a different device or location.</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>IP Address:</strong> ${ipAddress}</p>
      <p><strong>User-Agent:</strong> ${userAgent}</p>
      <p>If this was you, no action is needed. However, if you did not log in, please take immediate action to secure your account.</p>
      <p>Best Regards,</p>
      <p><strong>Security Team</strong></p>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Security alert email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send security alert email: ${error.message}`);
  }
};
