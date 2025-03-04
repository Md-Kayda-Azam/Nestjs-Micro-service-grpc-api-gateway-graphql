import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class EmailProcessor {
  @Process('sendVerification')
  async handleVerificationEmail(job: Job) {
    const { email, verificationToken, firstName } = job.data;

    // Placeholder for actual email sending logic
    console.log(
      `Sending verification email to ${email} for ${firstName} with token ${verificationToken}`,
    );
    // Replace with Nodemailer or your email service
    try {
      // await sendVerificationEmail(email, verificationToken, firstName);
      console.log(`Email sent to ${email}`);
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
