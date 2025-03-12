import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import {
  Teacher,
  CreateTeacherInput,
  UpdateTeacherInput,
  GetAllTeachersInput,
  GetAllTeachersOutput,
  DeleteTeacherOutput,
  CreateManyTeachersInput,
  CreateManyTeachersOutput,
  DeleteManyTeachersInput,
  DeleteManyTeachersOutput,
} from './entities/teacher.entity';
import { GraphQLError } from 'graphql';
import { Permissions } from 'src/shared/guards/decorator/permissions.decorator';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Mutation(() => Teacher)
  @Permissions('teacher:create')
  async createTeacher(
    @Args('createTeacherInput') createTeacherInput: CreateTeacherInput,
  ): Promise<Teacher> {
    try {
      return await this.teacherService.createTeacher(createTeacherInput);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('already exists')
            ? 'ALREADY_EXISTS'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Query(() => GetAllTeachersOutput)
  @Permissions('teacher:view')
  async getAllTeachers(
    @Args('getAllTeachersInput') getAllTeachersInput: GetAllTeachersInput,
  ): Promise<GetAllTeachersOutput> {
    try {
      return await this.teacherService.getAllTeachers(getAllTeachersInput);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Query(() => Teacher)
  @Permissions('teacher:view')
  async getTeacher(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Teacher> {
    try {
      return await this.teacherService.getTeacher(id);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('not found')
            ? 'NOT_FOUND'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => Teacher)
  @Permissions('teacher:update')
  async updateTeacher(
    @Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput,
  ): Promise<Teacher> {
    try {
      return await this.teacherService.updateTeacher(updateTeacherInput);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('not found')
            ? 'NOT_FOUND'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => DeleteTeacherOutput)
  @Permissions('teacher:delete')
  async deleteTeacher(
    @Args('id', { type: () => String }) id: string,
  ): Promise<DeleteTeacherOutput> {
    try {
      return await this.teacherService.deleteTeacher(id);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('not found')
            ? 'NOT_FOUND'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => CreateManyTeachersOutput)
  @Permissions('teacher:create')
  async createManyTeachers(
    @Args('createManyTeachersInput')
    createManyTeachersInput: CreateManyTeachersInput,
  ): Promise<CreateManyTeachersOutput> {
    try {
      return await this.teacherService.createManyTeachers(
        createManyTeachersInput,
      );
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('already exists')
            ? 'ALREADY_EXISTS'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => DeleteManyTeachersOutput)
  @Permissions('teacher:delete')
  async deleteManyTeachers(
    @Args('deleteManyTeachersInput')
    deleteManyTeachersInput: DeleteManyTeachersInput,
  ): Promise<DeleteManyTeachersOutput> {
    try {
      return await this.teacherService.deleteManyTeachers(
        deleteManyTeachersInput,
      );
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('not found')
            ? 'NOT_FOUND'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }
}
