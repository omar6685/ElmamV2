import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApp(): string {
    return 'Elmam Backend API';
  }
}
