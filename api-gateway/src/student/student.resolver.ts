import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import {
  Student,
  CreateStudentInput,
  UpdateStudentInput,
  GetAllStudentsInput,
  GetAllStudentsOutput,
  DeleteStudentOutput,
  CreateManyStudentsInput,
  CreateManyStudentsOutput,
  DeleteManyStudentsInput,
  DeleteManyStudentsOutput,
} from './entities/student.entity';
import { GraphQLError } from 'graphql';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    try {
      return await this.studentService.createStudent(createStudentInput);
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

  @Query(() => GetAllStudentsOutput)
  async getAllStudents(
    @Args('getAllStudentsInput') getAllStudentsInput: GetAllStudentsInput,
  ): Promise<GetAllStudentsOutput> {
    try {
      return await this.studentService.getAllStudents(getAllStudentsInput);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Query(() => Student)
  async getStudent(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Student> {
    try {
      return await this.studentService.getStudent(id);
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

  @Mutation(() => Student)
  async updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ): Promise<Student> {
    try {
      return await this.studentService.updateStudent(updateStudentInput);
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

  @Mutation(() => DeleteStudentOutput)
  async deleteStudent(
    @Args('id', { type: () => String }) id: string,
  ): Promise<DeleteStudentOutput> {
    try {
      return await this.studentService.deleteStudent(id);
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

  @Mutation(() => CreateManyStudentsOutput)
  async createManyStudents(
    @Args('createManyStudentsInput')
    createManyStudentsInput: CreateManyStudentsInput,
  ): Promise<CreateManyStudentsOutput> {
    try {
      return await this.studentService.createManyStudents(
        createManyStudentsInput,
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

  @Mutation(() => DeleteManyStudentsOutput)
  async deleteManyStudents(
    @Args('deleteManyStudentsInput')
    deleteManyStudentsInput: DeleteManyStudentsInput,
  ): Promise<DeleteManyStudentsOutput> {
    try {
      return await this.studentService.deleteManyStudents(
        deleteManyStudentsInput,
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
