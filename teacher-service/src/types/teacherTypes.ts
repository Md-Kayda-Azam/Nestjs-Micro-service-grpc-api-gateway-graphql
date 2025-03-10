export interface TeacherResponse {
  id: string;
  schoolId: string;
  email: string;
  phoneNumber: string;
  address?: string | null;
  subject: string;
  qualifications: string[];
  hireDate: string; // ISO string
  profilePictureUrl: string | null | undefined;
  status: string;
  dateOfBirth?: string | null; // ISO string
  gender: string;
  nationality: string;
  socialMediaLinks: Record<string, string> | null;
  emergencyContact: string | null | undefined;
  salary: number | null;
  teachingExperienceYears: number;
  assignedClasses: string[];
  assignedSubjects: string[];
  studentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeacherData {
  schoolId: string;
  email: string;
  phoneNumber: string;
  address?: string | null | undefined;
  subject: string;
  qualifications?: string[];
  hireDate: string; // ISO string
  profilePictureUrl?: string | null | undefined;
  status: string;
  dateOfBirth?: string | null; // ISO string
  gender: string;
  nationality: string;
  socialMediaLinks?: Record<string, string> | null | undefined;
  emergencyContact?: string | null | undefined;
  salary?: number | null;
  teachingExperienceYears?: number;
  assignedClasses?: string[];
  assignedSubjects?: string[];
  studentCount?: number;
}
