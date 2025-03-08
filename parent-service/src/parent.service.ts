import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateParentData, ParentResponse } from './types/parentTypes';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { Parent, ParentDocument } from './schema/parent.schema';

@Injectable()
export class ParentService {
  constructor(
    @InjectModel(Parent.name)
    private parentModel: Model<ParentDocument>,
  ) {}

  async createParent(data: CreateParentData): Promise<ParentResponse> {
    const existingParent = await this.parentModel
      .findOne({ phoneNumber: data.phoneNumber })
      .exec();
    if (existingParent) {
      throw new RpcException({
        code: grpc.status.ALREADY_EXISTS,
        message: 'A parent with this phone number already exists',
      });
    }

    const newParent = new this.parentModel({
      schoolId: data.schoolId,
      relationshipToStudent: data.relationshipToStudent,
      phoneNumber: data.phoneNumber,
      email: data.email,
      address: data.address,
      occupation: data.occupation,
      emergencyContacts: data.emergencyContacts || [],
      profilePictureUrl: data.profilePictureUrl,
      associatedStudents: data.associatedStudents || [],
      isPrimaryGuardian: data.isPrimaryGuardian ?? false,
      notes: data.notes,
    });

    const savedParent = await newParent.save();

    return {
      id: savedParent._id.toString(),
      schoolId: savedParent.schoolId,
      relationshipToStudent: savedParent.relationshipToStudent,
      phoneNumber: savedParent.phoneNumber,
      email: savedParent.email,
      address: savedParent.address,
      occupation: savedParent.occupation,
      emergencyContacts: savedParent.emergencyContacts,
      profilePictureUrl: savedParent.profilePictureUrl,
      associatedStudents: savedParent.associatedStudents,
      isPrimaryGuardian: savedParent.isPrimaryGuardian,
      notes: savedParent.notes,
      createdAt: savedParent.createdAt.toISOString(),
      updatedAt: savedParent.updatedAt.toISOString(),
    };
  }

  async getAllParents(data: {
    schoolId?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ parents: ParentResponse[]; total: number }> {
    try {
      const filter: any = {};
      if (data.schoolId) {
        filter.schoolId = data.schoolId;
      }

      const limit = data.limit ? Math.min(data.limit, 100) : 10;
      const offset = data.offset || 0;

      const total = await this.parentModel.countDocuments(filter).exec();
      const parents = await this.parentModel
        .find(filter)
        .skip(offset)
        .limit(limit)
        .exec();

      return {
        parents: parents.map((p) => ({
          id: p._id.toString(),
          schoolId: p.schoolId,
          relationshipToStudent: p.relationshipToStudent,
          phoneNumber: p.phoneNumber,
          email: p.email,
          address: p.address,
          occupation: p.occupation,
          emergencyContacts: p.emergencyContacts,
          profilePictureUrl: p.profilePictureUrl,
          associatedStudents: p.associatedStudents,
          isPrimaryGuardian: p.isPrimaryGuardian,
          notes: p.notes,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        })),
        total,
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch parents',
      });
    }
  }

  async getParent(data: { id: string }): Promise<ParentResponse> {
    try {
      const parent = await this.parentModel.findById(data.id).exec();
      if (!parent) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'Parent not found',
        });
      }

      return {
        id: parent._id.toString(),
        schoolId: parent.schoolId,
        relationshipToStudent: parent.relationshipToStudent,
        phoneNumber: parent.phoneNumber,
        email: parent.email,
        address: parent.address,
        occupation: parent.occupation,
        emergencyContacts: parent.emergencyContacts,
        profilePictureUrl: parent.profilePictureUrl,
        associatedStudents: parent.associatedStudents,
        isPrimaryGuardian: parent.isPrimaryGuardian,
        notes: parent.notes,
        createdAt: parent.createdAt.toISOString(),
        updatedAt: parent.updatedAt.toISOString(),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch parent',
      });
    }
  }

  async updateParent(
    data: { id: string } & Partial<CreateParentData>,
  ): Promise<ParentResponse> {
    try {
      const updateData: Partial<Parent> = {
        schoolId: data.schoolId,
        relationshipToStudent: data.relationshipToStudent,
        phoneNumber: data.phoneNumber,
        email: data.email ? data.email : undefined,
        address: data.address ? data.address : undefined,
        occupation: data.occupation ? data.occupation : undefined,
        emergencyContacts: data.emergencyContacts,
        profilePictureUrl: data.profilePictureUrl
          ? data.profilePictureUrl
          : undefined,
        associatedStudents: data.associatedStudents,
        isPrimaryGuardian: data.isPrimaryGuardian,
        notes: data.notes ? data.notes : undefined,
      };

      const parent = await this.parentModel
        .findByIdAndUpdate(data.id, updateData, { new: true })
        .exec();
      if (!parent) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'Parent not found',
        });
      }

      return {
        id: parent._id.toString(),
        schoolId: parent.schoolId,
        relationshipToStudent: parent.relationshipToStudent,
        phoneNumber: parent.phoneNumber,
        email: parent.email,
        address: parent.address,
        occupation: parent.occupation,
        emergencyContacts: parent.emergencyContacts,
        profilePictureUrl: parent.profilePictureUrl,
        associatedStudents: parent.associatedStudents,
        isPrimaryGuardian: parent.isPrimaryGuardian,
        notes: parent.notes,
        createdAt: parent.createdAt.toISOString(),
        updatedAt: parent.updatedAt.toISOString(),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update parent',
      });
    }
  }

  async deleteParent(data: {
    id: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.parentModel.findByIdAndDelete(data.id).exec();
      if (!result) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'Parent not found',
        });
      }

      return {
        success: true,
        message: 'Parent deleted successfully',
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete parent',
      });
    }
  }

  async createManyParents(data: {
    parents: CreateParentData[];
  }): Promise<{ parents: ParentResponse[] }> {
    try {
      const parentsToCreate = data.parents.map((p) => ({
        schoolId: p.schoolId,
        relationshipToStudent: p.relationshipToStudent,
        phoneNumber: p.phoneNumber,
        email: p.email,
        address: p.address,
        occupation: p.occupation,
        emergencyContacts: p.emergencyContacts || [],
        profilePictureUrl: p.profilePictureUrl,
        associatedStudents: p.associatedStudents || [],
        isPrimaryGuardian: p.isPrimaryGuardian ?? false,
        notes: p.notes,
      }));

      const savedParents = await this.parentModel.insertMany(parentsToCreate);

      return {
        parents: savedParents.map((p) => ({
          id: p._id.toString(),
          schoolId: p.schoolId,
          relationshipToStudent: p.relationshipToStudent,
          phoneNumber: p.phoneNumber,
          email: p.email,
          address: p.address,
          occupation: p.occupation,
          emergencyContacts: p.emergencyContacts,
          profilePictureUrl: p.profilePictureUrl,
          associatedStudents: p.associatedStudents,
          isPrimaryGuardian: p.isPrimaryGuardian,
          notes: p.notes,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        })),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create multiple parents',
      });
    }
  }

  async deleteManyParents(data: {
    ids: string[];
  }): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.parentModel
        .deleteMany({ _id: { $in: data.ids } })
        .exec();

      if (result.deletedCount === 0) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'No parents found to delete',
        });
      }

      return {
        success: true,
        message: `${result.deletedCount} parents deleted successfully`,
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete multiple parents',
      });
    }
  }
}
