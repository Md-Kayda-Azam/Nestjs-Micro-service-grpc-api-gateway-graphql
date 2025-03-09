import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ParentGrpcService } from './types/parentTypes';
import {
  Parent,
  CreateParentInput,
  UpdateParentInput,
  GetAllParentsInput,
  GetAllParentsOutput,
  DeleteParentOutput,
  CreateManyParentsInput,
  CreateManyParentsOutput,
  DeleteManyParentsInput,
  DeleteManyParentsOutput,
} from './entities/parent.entity';

@Injectable()
export class ParentService {
  private parentGrpcService: ParentGrpcService;

  constructor(@Inject('PARENT_PACKAGE') private client: ClientGrpc) {
    this.parentGrpcService =
      this.client.getService<ParentGrpcService>('ParentService');
  }

  async createParent(data: CreateParentInput): Promise<Parent> {
    try {
      const response = await lastValueFrom(
        this.parentGrpcService.CreateParent(data),
      );
      return {
        _id: response.id,
        schoolId: response.schoolId,
        relationshipToStudent: response.relationshipToStudent,
        phoneNumber: response.phoneNumber,
        email: response.email,
        address: response.address,
        occupation: response.occupation,
        emergencyContacts: response.emergencyContacts,
        profilePictureUrl: response.profilePictureUrl,
        associatedStudents: response.associatedStudents,
        isPrimaryGuardian: response.isPrimaryGuardian,
        notes: response.notes,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create parent');
    }
  }

  async getAllParents(data: GetAllParentsInput): Promise<GetAllParentsOutput> {
    try {
      const response = await lastValueFrom(
        this.parentGrpcService.GetAllParents(data),
      );
      return {
        parents: response.parents.map((parent) => ({
          _id: parent.id,
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
          createdAt: parent.createdAt,
          updatedAt: parent.updatedAt,
        })),
        total: response.total,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch parents');
    }
  }

  async getParent(id: string): Promise<Parent> {
    try {
      const response = await lastValueFrom(
        this.parentGrpcService.GetParent({ id }),
      );
      return {
        _id: response.id,
        schoolId: response.schoolId,
        relationshipToStudent: response.relationshipToStudent,
        phoneNumber: response.phoneNumber,
        email: response.email,
        address: response.address,
        occupation: response.occupation,
        emergencyContacts: response.emergencyContacts,
        profilePictureUrl: response.profilePictureUrl,
        associatedStudents: response.associatedStudents,
        isPrimaryGuardian: response.isPrimaryGuardian,
        notes: response.notes,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch parent');
    }
  }

  async updateParent(data: UpdateParentInput): Promise<Parent> {
    try {
      const response = await lastValueFrom(
        this.parentGrpcService.UpdateParent(data),
      );
      return {
        _id: response.id,
        schoolId: response.schoolId,
        relationshipToStudent: response.relationshipToStudent,
        phoneNumber: response.phoneNumber,
        email: response.email,
        address: response.address,
        occupation: response.occupation,
        emergencyContacts: response.emergencyContacts,
        profilePictureUrl: response.profilePictureUrl,
        associatedStudents: response.associatedStudents,
        isPrimaryGuardian: response.isPrimaryGuardian,
        notes: response.notes,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to update parent');
    }
  }

  async deleteParent(id: string): Promise<DeleteParentOutput> {
    try {
      const response = await lastValueFrom(
        this.parentGrpcService.DeleteParent({ id }),
      );
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to delete parent');
    }
  }

  async createManyParents(
    data: CreateManyParentsInput,
  ): Promise<CreateManyParentsOutput> {
    try {
      const response = await lastValueFrom(
        this.parentGrpcService.CreateManyParents(data),
      );
      return {
        parents: response.parents.map((parent) => ({
          _id: parent.id,
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
          createdAt: parent.createdAt,
          updatedAt: parent.updatedAt,
        })),
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create multiple parents');
    }
  }

  async deleteManyParents(
    data: DeleteManyParentsInput,
  ): Promise<DeleteManyParentsOutput> {
    try {
      const response = await lastValueFrom(
        this.parentGrpcService.DeleteManyParents(data),
      );
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to delete multiple parents');
    }
  }
}
