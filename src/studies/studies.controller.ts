import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesEnum } from 'src/shared/enums/role.enum';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('studies')
@UseGuards(RolesGuard)
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Get('admin')
  @Roles(RolesEnum.ADMIN) // Only allow users with 'admin' role to access this route
  getAdminResource() {
    return 'This is an admin-only resource';
  }

  @Get('user')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER) // Allow users with 'user' or 'admin' roles to access this route
  getUserResource() {
    return 'This is a resource for users and admins';
  }
}
