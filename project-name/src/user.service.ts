
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


// This should be a real class/interface representing a user entity


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({where: {username}});
  }

  async newUser(username,pass): Promise<void> {
    let user = new User(username,pass);
    this.usersRepository.save(user);
  }


}
