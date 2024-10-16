import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesEnum } from 'src/shared/enums/role.enum';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('notifications')
@UseGuards(RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
