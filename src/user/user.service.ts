import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserQueriesDto } from './dto/get-user-queries.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';

// export interface User {
//   id: number;
//   name: string;
//   age: number;
//   email: string;
//   password: string;
// }

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UserRepository,
  ) {}

  async getUsers(queries: GetUserQueriesDto) {
    const listUsers = await this.usersRepository.find();
    console.log('listUsers: ', listUsers);
    return listUsers;
  }

  async createUser(body: CreateUserDto) {
    const newUser = await this.usersRepository.create(body);
    return await this.usersRepository.save(newUser);
  }

  async updateUser(id: number, body: UpdateUserDto) {
    const userRec = await this.usersRepository.findOne({ where: { id: id } });
    // check exist
    const updateUser = {
      ...userRec,
      ...body,
    };
    return await this.usersRepository.save(updateUser);
  }

  async getUser(id: number) {
    // findByEmail()
    return await this.usersRepository.findByEmail('manh123');
  }

  async deleteUser(id: number) {
    return await this.usersRepository.delete(id);
  }
}
