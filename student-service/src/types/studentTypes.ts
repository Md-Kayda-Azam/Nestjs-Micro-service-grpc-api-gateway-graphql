export interface StudentResponse {
  id: string;
  schoolId: string;
  dateOfBirth: string; // ISO string
  gender: string;
  studentID: string;
  email: string;
  phoneNumber: string;
  address: string | null | undefined; // undefined যোগ করা হয়েছে
  admissionDate: string; // ISO string
  enrollmentDate: string; // ISO string
  classId: string;
  enrolledCourses: string[];
  grades: Record<string, number>;
  extracurricularActivities: string[];
  parentId: string; // required হওয়ায় null বা undefined নেই
  nationality: string;
  graduationDate: string | null; // ISO string
  profilePictureUrl: string | null | undefined; // undefined যোগ করা হয়েছে
  awards: string[];
  healthDetails: string | null | undefined; // undefined যোগ করা হয়েছে
  isSpecialNeeds: boolean;
  remarks: string | null | undefined; // undefined যোগ করা হয়েছে
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentData {
  schoolId: string;
  dateOfBirth: string; // ISO string
  gender: string;
  studentID: string;
  email: string;
  phoneNumber: string;
  address?: string | null | undefined; // undefined যোগ করা হয়েছে
  admissionDate: string; // ISO string
  enrollmentDate: string; // ISO string
  classId: string;
  enrolledCourses?: string[];
  grades?: Record<string, number>;
  extracurricularActivities?: string[];
  parentId: string; // required হওয়ায় null বা undefined নেই
  nationality: string;
  graduationDate?: string | null; // ISO string
  profilePictureUrl?: string | null | undefined; // undefined যোগ করা হয়েছে
  awards?: string[];
  healthDetails?: string | null | undefined; // undefined যোগ করা হয়েছে
  isSpecialNeeds?: boolean;
  remarks?: string | null | undefined; // undefined যোগ করা হয়েছে
}
