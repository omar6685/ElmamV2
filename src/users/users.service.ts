import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'john',
      email: 'john@elmam.net',
      phone_number: '0556190490',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'maria',
      email: 'maria@elmam.net',
      phone_number: '0556190491',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
