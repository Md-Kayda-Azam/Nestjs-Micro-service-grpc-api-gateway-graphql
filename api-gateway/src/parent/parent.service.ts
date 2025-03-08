import { Injectable } from '@nestjs/common';
import { CreateParentInput } from './dto/create-parent.input';
import { UpdateParentInput } from './dto/update-parent.input';

@Injectable()
export class ParentService {
  create(createParentInput: CreateParentInput) {
    return 'This action adds a new parent';
  }

  findAll() {
    return `This action returns all parent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parent`;
  }

  update(id: number, updateParentInput: UpdateParentInput) {
    return `This action updates a #${id} parent`;
  }

  remove(id: number) {
    return `This action removes a #${id} parent`;
  }
}
