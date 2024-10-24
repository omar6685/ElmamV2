import { SeederFactoryManager, setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { Role, UserRole } from 'src/auth/entities/role.entity';
import { RolesEnum } from 'src/shared/enums/role.enum';
import { DataSource } from 'typeorm';

export default setSeederFactory(
  User,
  async (faker, factoryManager: SeederFactoryManager) => {
    const user = new User();

    const sexFlag = faker.number.int(1);
    const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';

    user.firstName = faker.person.firstName(sex);
    user.lastName = faker.person.lastName(sex);
    user.email = faker.internet.email();
    user.birthdate = faker.date.birthdate();
    user.phone = faker.phone.number();
    user.encryptedPassword = bcrypt.hashSync(user.email, 10);

    return user;
  },
);
