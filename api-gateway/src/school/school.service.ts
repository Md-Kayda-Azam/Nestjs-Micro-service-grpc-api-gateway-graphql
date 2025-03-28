import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SchoolGrpcService } from './types/schoolTypes';
import {
  School,
  CreateSchoolInput,
  UpdateSchoolInput,
  GetAllSchoolsInput,
  GetAllSchoolsOutput,
  DeleteSchoolOutput,
  CreateManySchoolsInput,
  CreateManySchoolsOutput,
  DeleteManySchoolsInput,
  DeleteManySchoolsOutput,
  SocialMediaLink,
} from './entities/school.entity';

@Injectable()
export class SchoolService {
  private schoolGrpcService: SchoolGrpcService;

  constructor(@Inject('SCHOOL_PACKAGE') private client: ClientGrpc) {
    this.schoolGrpcService =
      this.client.getService<SchoolGrpcService>('SchoolService');
  }

  // gRPC থেকে GraphQL-এ socialMediaLinks রূপান্তর ফাংশন
  private mapSocialMediaLinks(socialMediaLinks: {
    [key: string]: string;
  }): SocialMediaLink[] {
    return Object.entries(socialMediaLinks || {}).map(([platform, url]) => ({
      platform,
      url,
    }));
  }

  async createSchool(data: CreateSchoolInput): Promise<School> {
    try {
      // GraphQL থেকে gRPC-তে socialMediaLinks রূপান্তর
      const grpcData = {
        ...data,
        socialMediaLinks: data.socialMediaLinks
          ? data.socialMediaLinks.reduce(
              (acc, link) => {
                acc[link.platform] = link.url;
                return acc;
              },
              {} as { [key: string]: string },
            )
          : {},
      };

      const response = await lastValueFrom(
        this.schoolGrpcService.CreateSchool(grpcData),
      );
      return {
        _id: response.id,
        name: response.name,
        address: response.address,
        phoneNumber: response.phoneNumber,
        courses: response.courses,
        principal: response.principal,
        website: response.website,
        isActive: response.isActive,
        staff: response.staff,
        logoUrl: response.logoUrl,
        studentCount: response.studentCount,
        teacherCount: response.teacherCount,
        establishedYear: response.establishedYear,
        schoolType: response.schoolType,
        region: response.region,
        extracurricularActivities: response.extracurricularActivities,
        affiliations: response.affiliations,
        accreditationStatus: response.accreditationStatus,
        country: response.country,
        city: response.city,
        postalCode: response.postalCode,
        socialMediaLinks: this.mapSocialMediaLinks(response.socialMediaLinks),
        lastInspectionDate: response.lastInspectionDate,
        totalCampusArea: response.totalCampusArea,
        numberOfBuildings: response.numberOfBuildings,
        languagesOffered: response.languagesOffered,
        studentTeacherRatio: response.studentTeacherRatio,
        schoolLogo: response.schoolLogo,
        isOnlineLearningAvailable: response.isOnlineLearningAvailable,
        numberOfClassrooms: response.numberOfClassrooms,
        schoolEvents: response.schoolEvents,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create school');
    }
  }

  async getAllSchools(data: GetAllSchoolsInput): Promise<GetAllSchoolsOutput> {
    try {
      const response = await lastValueFrom(
        this.schoolGrpcService.GetAllSchools(data),
      );
      if (response.total === 0) {
        return {
          schools: [],
          total: 0,
          message: 'No schools found (empty)', // কাস্টম মেসেজ
        };
      }
      return {
        schools: response.schools.map((school) => ({
          _id: school.id,
          name: school.name,
          address: school.address,
          phoneNumber: school.phoneNumber,
          courses: school.courses,
          principal: school.principal,
          website: school.website,
          isActive: school.isActive,
          staff: school.staff,
          logoUrl: school.logoUrl,
          studentCount: school.studentCount,
          teacherCount: school.teacherCount,
          establishedYear: school.establishedYear,
          schoolType: school.schoolType,
          region: school.region,
          extracurricularActivities: school.extracurricularActivities,
          affiliations: school.affiliations,
          accreditationStatus: school.accreditationStatus,
          country: school.country,
          city: school.city,
          postalCode: school.postalCode,
          socialMediaLinks: this.mapSocialMediaLinks(school.socialMediaLinks),
          lastInspectionDate: school.lastInspectionDate,
          totalCampusArea: school.totalCampusArea,
          numberOfBuildings: school.numberOfBuildings,
          languagesOffered: school.languagesOffered,
          studentTeacherRatio: school.studentTeacherRatio,
          schoolLogo: school.schoolLogo,
          isOnlineLearningAvailable: school.isOnlineLearningAvailable,
          numberOfClassrooms: school.numberOfClassrooms,
          schoolEvents: school.schoolEvents,
          createdAt: school.createdAt,
          updatedAt: school.updatedAt,
        })),
        total: response.total,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch schools');
    }
  }

  async getSchool(id: string): Promise<School> {
    try {
      const response = await lastValueFrom(
        this.schoolGrpcService.GetSchool({ id }),
      );
      return {
        _id: response.id,
        name: response.name,
        address: response.address,
        phoneNumber: response.phoneNumber,
        courses: response.courses,
        principal: response.principal,
        website: response.website,
        isActive: response.isActive,
        staff: response.staff,
        logoUrl: response.logoUrl,
        studentCount: response.studentCount,
        teacherCount: response.teacherCount,
        establishedYear: response.establishedYear,
        schoolType: response.schoolType,
        region: response.region,
        extracurricularActivities: response.extracurricularActivities,
        affiliations: response.affiliations,
        accreditationStatus: response.accreditationStatus,
        country: response.country,
        city: response.city,
        postalCode: response.postalCode,
        socialMediaLinks: this.mapSocialMediaLinks(response.socialMediaLinks),
        lastInspectionDate: response.lastInspectionDate,
        totalCampusArea: response.totalCampusArea,
        numberOfBuildings: response.numberOfBuildings,
        languagesOffered: response.languagesOffered,
        studentTeacherRatio: response.studentTeacherRatio,
        schoolLogo: response.schoolLogo,
        isOnlineLearningAvailable: response.isOnlineLearningAvailable,
        numberOfClassrooms: response.numberOfClassrooms,
        schoolEvents: response.schoolEvents,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch school');
    }
  }

  async updateSchool(data: UpdateSchoolInput): Promise<School> {
    try {
      // GraphQL থেকে gRPC-তে socialMediaLinks রূপান্তর
      const grpcData = {
        ...data,
        socialMediaLinks: data.socialMediaLinks
          ? data.socialMediaLinks.reduce(
              (acc, link) => {
                acc[link.platform] = link.url;
                return acc;
              },
              {} as { [key: string]: string },
            )
          : {},
      };

      const response = await lastValueFrom(
        this.schoolGrpcService.UpdateSchool(grpcData),
      );
      return {
        _id: response.id,
        name: response.name,
        address: response.address,
        phoneNumber: response.phoneNumber,
        courses: response.courses,
        principal: response.principal,
        website: response.website,
        isActive: response.isActive,
        staff: response.staff,
        logoUrl: response.logoUrl,
        studentCount: response.studentCount,
        teacherCount: response.teacherCount,
        establishedYear: response.establishedYear,
        schoolType: response.schoolType,
        region: response.region,
        extracurricularActivities: response.extracurricularActivities,
        affiliations: response.affiliations,
        accreditationStatus: response.accreditationStatus,
        country: response.country,
        city: response.city,
        postalCode: response.postalCode,
        socialMediaLinks: this.mapSocialMediaLinks(response.socialMediaLinks),
        lastInspectionDate: response.lastInspectionDate,
        totalCampusArea: response.totalCampusArea,
        numberOfBuildings: response.numberOfBuildings,
        languagesOffered: response.languagesOffered,
        studentTeacherRatio: response.studentTeacherRatio,
        schoolLogo: response.schoolLogo,
        isOnlineLearningAvailable: response.isOnlineLearningAvailable,
        numberOfClassrooms: response.numberOfClassrooms,
        schoolEvents: response.schoolEvents,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to update school');
    }
  }

  async deleteSchool(id: string): Promise<DeleteSchoolOutput> {
    try {
      const response = await lastValueFrom(
        this.schoolGrpcService.DeleteSchool({ id }),
      );
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to delete school');
    }
  }

  async createManySchools(
    data: CreateManySchoolsInput,
  ): Promise<CreateManySchoolsOutput> {
    try {
      // GraphQL থেকে gRPC-তে socialMediaLinks রূপান্তর
      const grpcData = {
        schools: data.schools.map((school) => ({
          ...school,
          socialMediaLinks: school.socialMediaLinks
            ? school.socialMediaLinks.reduce(
                (acc, link) => {
                  acc[link.platform] = link.url;
                  return acc;
                },
                {} as { [key: string]: string },
              )
            : {},
        })),
      };

      const response = await lastValueFrom(
        this.schoolGrpcService.CreateManySchools(grpcData),
      );
      return {
        schools: response.schools.map((school) => ({
          _id: school.id,
          name: school.name,
          address: school.address,
          phoneNumber: school.phoneNumber,
          courses: school.courses,
          principal: school.principal,
          website: school.website,
          isActive: school.isActive,
          staff: school.staff,
          logoUrl: school.logoUrl,
          studentCount: school.studentCount,
          teacherCount: school.teacherCount,
          establishedYear: school.establishedYear,
          schoolType: school.schoolType,
          region: school.region,
          extracurricularActivities: school.extracurricularActivities,
          affiliations: school.affiliations,
          accreditationStatus: school.accreditationStatus,
          country: school.country,
          city: school.city,
          postalCode: school.postalCode,
          socialMediaLinks: this.mapSocialMediaLinks(school.socialMediaLinks),
          lastInspectionDate: school.lastInspectionDate,
          totalCampusArea: school.totalCampusArea,
          numberOfBuildings: school.numberOfBuildings,
          languagesOffered: school.languagesOffered,
          studentTeacherRatio: school.studentTeacherRatio,
          schoolLogo: school.schoolLogo,
          isOnlineLearningAvailable: school.isOnlineLearningAvailable,
          numberOfClassrooms: school.numberOfClassrooms,
          schoolEvents: school.schoolEvents,
          createdAt: school.createdAt,
          updatedAt: school.updatedAt,
        })),
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create multiple schools');
    }
  }

  async deleteManySchools(
    data: DeleteManySchoolsInput,
  ): Promise<DeleteManySchoolsOutput> {
    try {
      const response = await lastValueFrom(
        this.schoolGrpcService.DeleteManySchools(data),
      );
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to delete multiple schools');
    }
  }
}
