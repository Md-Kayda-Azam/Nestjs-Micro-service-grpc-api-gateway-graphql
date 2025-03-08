export interface ParentResponse {
  id: string;
  schoolId: string;
  relationshipToStudent: string;
  phoneNumber: string;
  email: string | null | undefined;
  address: string | null | undefined;
  occupation: string | null | undefined;
  emergencyContacts: string[];
  profilePictureUrl: string | null | undefined;
  associatedStudents: string[];
  isPrimaryGuardian: boolean;
  notes: string | null | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface CreateParentData {
  schoolId: string;
  relationshipToStudent: string;
  phoneNumber: string;
  email?: string | null | undefined;
  address?: string | null | undefined;
  occupation?: string | null | undefined;
  emergencyContacts?: string[];
  profilePictureUrl?: string | null | undefined;
  associatedStudents?: string[];
  isPrimaryGuardian?: boolean;
  notes?: string | null | undefined;
}
