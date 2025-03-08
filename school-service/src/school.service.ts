import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { School, SchoolDocument } from './schema/schoolShema';
import { CreateSchoolData, SchoolResponse } from './types/schoolTypes.';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School.name)
    private schoolModel: Model<SchoolDocument>,
  ) {}

  async createSchool(data: CreateSchoolData): Promise<SchoolResponse> {
    const existingSchool = await this.schoolModel
      .findOne({ name: data.name, address: data.address })
      .exec();
    if (existingSchool) {
      throw new RpcException({
        code: grpc.status.ALREADY_EXISTS,
        message: 'A school with this name and address already exists',
      });
    }

    const newSchool = new this.schoolModel({
      name: data.name,
      address: data.address,
      phoneNumber: data.phoneNumber,
      courses: data.courses || [],
      principal: data.principal,
      website: data.website || null,
      isActive: data.isActive !== undefined ? data.isActive : false,
      staff: data.staff || [],
      logoUrl: data.logoUrl || null,
      studentCount: data.studentCount || 0,
      teacherCount: data.teacherCount || 0,
      establishedYear: data.establishedYear,
      schoolType: data.schoolType,
      region: data.region,
      extracurricularActivities: data.extracurricularActivities || [],
      affiliations: data.affiliations || [],
      accreditationStatus: data.accreditationStatus || null,
      country: data.country,
      city: data.city,
      postalCode: data.postalCode,
      socialMediaLinks: data.socialMediaLinks || {},
      lastInspectionDate: data.lastInspectionDate || null,
      totalCampusArea: data.totalCampusArea,
      numberOfBuildings: data.numberOfBuildings,
      languagesOffered: data.languagesOffered || [],
      studentTeacherRatio: data.studentTeacherRatio,
      schoolLogo: data.schoolLogo || null,
      isOnlineLearningAvailable: data.isOnlineLearningAvailable || false,
      numberOfClassrooms: data.numberOfClassrooms,
      schoolEvents: data.schoolEvents || [],
    });

    const savedSchool = await newSchool.save();

    return {
      id: savedSchool._id.toString(),
      name: savedSchool.name,
      address: savedSchool.address,
      phoneNumber: savedSchool.phoneNumber,
      courses: savedSchool.courses,
      principal: savedSchool.principal,
      website: savedSchool.website,
      isActive: savedSchool.isActive,
      staff: savedSchool.staff,
      logoUrl: savedSchool.logoUrl,
      studentCount: savedSchool.studentCount,
      teacherCount: savedSchool.teacherCount,
      establishedYear: savedSchool.establishedYear,
      schoolType: savedSchool.schoolType,
      region: savedSchool.region,
      extracurricularActivities: savedSchool.extracurricularActivities,
      affiliations: savedSchool.affiliations,
      accreditationStatus: savedSchool.accreditationStatus,
      country: savedSchool.country,
      city: savedSchool.city,
      postalCode: savedSchool.postalCode,
      socialMediaLinks: savedSchool.socialMediaLinks,
      lastInspectionDate: savedSchool.lastInspectionDate
        ? savedSchool.lastInspectionDate.toISOString()
        : null,
      totalCampusArea: savedSchool.totalCampusArea,
      numberOfBuildings: savedSchool.numberOfBuildings,
      languagesOffered: savedSchool.languagesOffered,
      studentTeacherRatio: savedSchool.studentTeacherRatio,
      schoolLogo: savedSchool.schoolLogo,
      isOnlineLearningAvailable: savedSchool.isOnlineLearningAvailable,
      numberOfClassrooms: savedSchool.numberOfClassrooms,
      schoolEvents: savedSchool.schoolEvents,
      createdAt: savedSchool.createdAt.toISOString(),
      updatedAt: savedSchool.updatedAt.toISOString(),
    };
  }

  async getAllSchools(data: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ schools: SchoolResponse[]; total: number }> {
    try {
      const filter: any = {};
      if (data.isActive !== undefined) filter.isActive = data.isActive;

      const limit = data.limit ? Math.min(data.limit, 100) : 10;
      const offset = data.offset || 0;

      const total = await this.schoolModel.countDocuments(filter).exec();
      const schools = await this.schoolModel
        .find(filter)
        .skip(offset)
        .limit(limit)
        .exec();

      return {
        schools: schools.map((s) => ({
          id: s._id.toString(),
          name: s.name,
          address: s.address,
          phoneNumber: s.phoneNumber,
          courses: s.courses,
          principal: s.principal,
          website: s.website,
          isActive: s.isActive,
          staff: s.staff,
          logoUrl: s.logoUrl,
          studentCount: s.studentCount,
          teacherCount: s.teacherCount,
          establishedYear: s.establishedYear,
          schoolType: s.schoolType,
          region: s.region,
          extracurricularActivities: s.extracurricularActivities,
          affiliations: s.affiliations,
          accreditationStatus: s.accreditationStatus,
          country: s.country,
          city: s.city,
          postalCode: s.postalCode,
          socialMediaLinks: s.socialMediaLinks,
          lastInspectionDate: s.lastInspectionDate
            ? s.lastInspectionDate.toISOString()
            : null,
          totalCampusArea: s.totalCampusArea,
          numberOfBuildings: s.numberOfBuildings,
          languagesOffered: s.languagesOffered,
          studentTeacherRatio: s.studentTeacherRatio,
          schoolLogo: s.schoolLogo,
          isOnlineLearningAvailable: s.isOnlineLearningAvailable,
          numberOfClassrooms: s.numberOfClassrooms,
          schoolEvents: s.schoolEvents,
          createdAt: s.createdAt.toISOString(),
          updatedAt: s.updatedAt.toISOString(),
        })),
        total,
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch schools',
      });
    }
  }

  async getSchool(data: { id: string }): Promise<SchoolResponse> {
    try {
      const school = await this.schoolModel.findById(data.id).exec();
      if (!school) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'School not found',
        });
      }

      return {
        id: school._id.toString(),
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
        socialMediaLinks: school.socialMediaLinks,
        lastInspectionDate: school.lastInspectionDate
          ? school.lastInspectionDate.toISOString()
          : null,
        totalCampusArea: school.totalCampusArea,
        numberOfBuildings: school.numberOfBuildings,
        languagesOffered: school.languagesOffered,
        studentTeacherRatio: school.studentTeacherRatio,
        schoolLogo: school.schoolLogo,
        isOnlineLearningAvailable: school.isOnlineLearningAvailable,
        numberOfClassrooms: school.numberOfClassrooms,
        schoolEvents: school.schoolEvents,
        createdAt: school.createdAt.toISOString(),
        updatedAt: school.updatedAt.toISOString(),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch school',
      });
    }
  }

  async updateSchool(
    data: { id: string } & Partial<CreateSchoolData>,
  ): Promise<SchoolResponse> {
    try {
      const updateData: Partial<School> = {
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        courses: data.courses,
        principal: data.principal,
        website: data.website ? data.website : undefined,
        isActive: data.isActive,
        staff: data.staff,
        logoUrl: data.logoUrl ? data.logoUrl : undefined,
        studentCount: data.studentCount,
        teacherCount: data.teacherCount,
        establishedYear: data.establishedYear,
        schoolType: data.schoolType,
        region: data.region,
        extracurricularActivities: data.extracurricularActivities,
        affiliations: data.affiliations,
        accreditationStatus: data.accreditationStatus
          ? data.accreditationStatus
          : undefined,
        country: data.country,
        city: data.city,
        postalCode: data.postalCode,
        socialMediaLinks: data.socialMediaLinks
          ? data.socialMediaLinks
          : undefined,
        lastInspectionDate: data.lastInspectionDate
          ? new Date(data.lastInspectionDate)
          : undefined, // সঠিক টাইপ ম্যাচ করা হলো
        totalCampusArea: data.totalCampusArea,
        numberOfBuildings: data.numberOfBuildings,
        languagesOffered: data.languagesOffered,
        studentTeacherRatio: data.studentTeacherRatio,
        schoolLogo: data.schoolLogo ? data.schoolLogo : undefined,
        isOnlineLearningAvailable: data.isOnlineLearningAvailable,
        numberOfClassrooms: data.numberOfClassrooms,
        schoolEvents: data.schoolEvents,
      };

      const school = await this.schoolModel
        .findByIdAndUpdate(data.id, updateData, { new: true })
        .exec();
      if (!school) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'School not found',
        });
      }

      return {
        id: school._id.toString(),
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
        socialMediaLinks: school.socialMediaLinks,
        lastInspectionDate: school.lastInspectionDate
          ? school.lastInspectionDate.toISOString()
          : null,
        totalCampusArea: school.totalCampusArea,
        numberOfBuildings: school.numberOfBuildings,
        languagesOffered: school.languagesOffered,
        studentTeacherRatio: school.studentTeacherRatio,
        schoolLogo: school.schoolLogo,
        isOnlineLearningAvailable: school.isOnlineLearningAvailable,
        numberOfClassrooms: school.numberOfClassrooms,
        schoolEvents: school.schoolEvents,
        createdAt: school.createdAt.toISOString(),
        updatedAt: school.updatedAt.toISOString(),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update school',
      });
    }
  }

  async deleteSchool(data: {
    id: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.schoolModel.findByIdAndDelete(data.id).exec();
      if (!result) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'School not found',
        });
      }

      return {
        success: true,
        message: 'School deleted successfully',
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete school',
      });
    }
  }

  async createManySchools(data: {
    schools: CreateSchoolData[];
  }): Promise<{ schools: SchoolResponse[] }> {
    try {
      const schoolsToCreate = data.schools.map((s) => ({
        name: s.name,
        address: s.address,
        phoneNumber: s.phoneNumber,
        courses: s.courses || [],
        principal: s.principal,
        website: s.website || null,
        isActive: s.isActive !== undefined ? s.isActive : false,
        staff: s.staff || [],
        logoUrl: s.logoUrl || null,
        studentCount: s.studentCount || 0,
        teacherCount: s.teacherCount || 0,
        establishedYear: s.establishedYear,
        schoolType: s.schoolType,
        region: s.region,
        extracurricularActivities: s.extracurricularActivities || [],
        affiliations: s.affiliations || [],
        accreditationStatus: s.accreditationStatus || null,
        country: s.country,
        city: s.city,
        postalCode: s.postalCode,
        socialMediaLinks: s.socialMediaLinks || {},
        lastInspectionDate: s.lastInspectionDate
          ? new Date(s.lastInspectionDate)
          : null,
        totalCampusArea: s.totalCampusArea,
        numberOfBuildings: s.numberOfBuildings,
        languagesOffered: s.languagesOffered || [],
        studentTeacherRatio: s.studentTeacherRatio,
        schoolLogo: s.schoolLogo || null,
        isOnlineLearningAvailable: s.isOnlineLearningAvailable || false,
        numberOfClassrooms: s.numberOfClassrooms,
        schoolEvents: s.schoolEvents || [],
      }));

      const savedSchools = await this.schoolModel.insertMany(schoolsToCreate);

      return {
        schools: savedSchools.map((s) => ({
          id: s._id.toString(),
          name: s.name,
          address: s.address,
          phoneNumber: s.phoneNumber,
          courses: s.courses,
          principal: s.principal,
          website: s.website,
          isActive: s.isActive,
          staff: s.staff,
          logoUrl: s.logoUrl,
          studentCount: s.studentCount,
          teacherCount: s.teacherCount,
          establishedYear: s.establishedYear,
          schoolType: s.schoolType,
          region: s.region,
          extracurricularActivities: s.extracurricularActivities,
          affiliations: s.affiliations,
          accreditationStatus: s.accreditationStatus,
          country: s.country,
          city: s.city,
          postalCode: s.postalCode,
          socialMediaLinks: s.socialMediaLinks,
          lastInspectionDate: s.lastInspectionDate
            ? s.lastInspectionDate.toISOString()
            : null,
          totalCampusArea: s.totalCampusArea,
          numberOfBuildings: s.numberOfBuildings,
          languagesOffered: s.languagesOffered,
          studentTeacherRatio: s.studentTeacherRatio,
          schoolLogo: s.schoolLogo,
          isOnlineLearningAvailable: s.isOnlineLearningAvailable,
          numberOfClassrooms: s.numberOfClassrooms,
          schoolEvents: s.schoolEvents,
          createdAt: s.createdAt.toISOString(),
          updatedAt: s.updatedAt.toISOString(),
        })),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create multiple schools',
      });
    }
  }

  async deleteManySchools(data: {
    ids: string[];
  }): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.schoolModel
        .deleteMany({ _id: { $in: data.ids } })
        .exec();

      if (result.deletedCount === 0) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'No schools found to delete',
        });
      }

      return {
        success: true,
        message: `${result.deletedCount} schools deleted successfully`,
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete multiple schools',
      });
    }
  }
}
