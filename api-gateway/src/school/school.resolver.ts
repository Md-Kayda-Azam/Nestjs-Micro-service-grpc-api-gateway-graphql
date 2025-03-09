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

@Resolver(() => School)
export class SchoolResolver {
  constructor(private readonly schoolService: SchoolService) {}

  @Mutation(() => School)
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
