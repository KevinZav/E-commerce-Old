import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { createUserDto, updateUserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getUsers() {
    return await this.userRepo.find();
  }

  async getSingleUser(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException('Could not be find user');

    return user;
  }

  async createUser(payload: createUserDto) {
    const newUser = this.userRepo.create(payload);
    if (!newUser) throw new BadRequestException('Could not create user');

    return await this.userRepo.save(newUser);
  }

  async updateUser(id: number, payload: updateUserDto) {
    const user = await this.getSingleUser(id);
    this.userRepo.merge(user, payload);

    return await this.userRepo.save(user);
  }

  async activateUser(id: number) {
    const user = await this.getSingleUser(id);
    this.userRepo.merge(user, { isActive: true });

    return await this.userRepo.save(user);
  }

  async inactivateUser(id: number) {
    const user = await this.getSingleUser(id);
    this.userRepo.merge(user, { isActive: false });

    return await this.userRepo.save(user);
  }
}
