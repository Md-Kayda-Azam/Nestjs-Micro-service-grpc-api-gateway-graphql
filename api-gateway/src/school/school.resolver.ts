import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SchoolService } from './school.service';
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
} from './entities/school.entity';
import { GraphQLError } from 'graphql';
import { Permissions } from 'src/shared/guards/decorator/permissions.decorator';

@Resolver(() => School)
export class SchoolResolver {
  constructor(private readonly schoolService: SchoolService) {}

  @Mutation(() => School)
  @Permissions('school:create')
  async createSchool(
    @Args('createSchoolInput') createSchoolInput: CreateSchoolInput,
  ): Promise<School> {
    try {
      return await this.schoolService.createSchool(createSchoolInput);
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

  @Query(() => GetAllSchoolsOutput)
  @Permissions('school:view')
  async getAllSchools(
    @Args('getAllSchoolsInput') getAllSchoolsInput: GetAllSchoolsInput,
  ): Promise<GetAllSchoolsOutput> {
    try {
      return await this.schoolService.getAllSchools(getAllSchoolsInput);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Query(() => School)
  @Permissions('school:view')
  async getSchool(
    @Args('id', { type: () => String }) id: string,
  ): Promise<School> {
    try {
      return await this.schoolService.getSchool(id);
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

  @Mutation(() => School)
  @Permissions('school:update')
  async updateSchool(
    @Args('updateSchoolInput') updateSchoolInput: UpdateSchoolInput,
  ): Promise<School> {
    try {
      return await this.schoolService.updateSchool(updateSchoolInput);
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

  @Mutation(() => DeleteSchoolOutput)
  @Permissions('school:delete')
  async deleteSchool(
    @Args('id', { type: () => String }) id: string,
  ): Promise<DeleteSchoolOutput> {
    try {
      return await this.schoolService.deleteSchool(id);
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

  @Mutation(() => CreateManySchoolsOutput)
  @Permissions('school:create')
  async createManySchools(
    @Args('createManySchoolsInput')
    createManySchoolsInput: CreateManySchoolsInput,
  ): Promise<CreateManySchoolsOutput> {
    try {
      return await this.schoolService.createManySchools(createManySchoolsInput);
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

  @Mutation(() => DeleteManySchoolsOutput)
  @Permissions('school:delete')
  async deleteManySchools(
    @Args('deleteManySchoolsInput')
    deleteManySchoolsInput: DeleteManySchoolsInput,
  ): Promise<DeleteManySchoolsOutput> {
    try {
      return await this.schoolService.deleteManySchools(deleteManySchoolsInput);
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
