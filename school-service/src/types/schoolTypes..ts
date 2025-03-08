export interface SchoolResponse {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  courses: string[];
  principal: string;
  website: string | null | undefined; // undefined যোগ করা হয়েছে
  isActive: boolean;
  staff: string[];
  logoUrl: string | null | undefined; // undefined যোগ করা হয়েছে
  studentCount: number;
  teacherCount: number;
  establishedYear: number;
  schoolType: string;
  region: string;
  extracurricularActivities: string[];
  affiliations: string[];
  accreditationStatus: string | null | undefined; // undefined যোগ করা হয়েছে
  country: string;
  city: string;
  postalCode: string;
  socialMediaLinks: Record<string, string> | null | undefined; // undefined যোগ করা হয়েছে
  lastInspectionDate: string | null; // ইতিমধ্যে সঠিক
  totalCampusArea: number;
  numberOfBuildings: number;
  languagesOffered: string[];
  studentTeacherRatio: number;
  schoolLogo: string | null | undefined; // undefined যোগ করা হয়েছে
  isOnlineLearningAvailable: boolean;
  numberOfClassrooms: number;
  schoolEvents: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSchoolData {
  name: string;
  address: string;
  phoneNumber: string;
  courses?: string[];
  principal: string;
  website?: string | null | undefined; // undefined যোগ করা হয়েছে
  isActive?: boolean;
  staff?: string[];
  logoUrl?: string | null | undefined; // undefined যোগ করা হয়েছে
  studentCount?: number;
  teacherCount?: number;
  establishedYear: number;
  schoolType: string;
  region: string;
  extracurricularActivities?: string[];
  affiliations?: string[];
  accreditationStatus?: string | null | undefined; // undefined যোগ করা হয়েছে
  country: string;
  city: string;
  postalCode: string;
  socialMediaLinks?: Record<string, string> | null | undefined; // undefined যোগ করা হয়েছে
  lastInspectionDate?: string | null; // ইনপুট হিসেবে স্ট্রিং আসবে
  totalCampusArea: number;
  numberOfBuildings: number;
  languagesOffered?: string[];
  studentTeacherRatio: number;
  schoolLogo?: string | null | undefined; // undefined যোগ করা হয়েছে
  isOnlineLearningAvailable?: boolean;
  numberOfClassrooms: number;
  schoolEvents?: string[];
}
