import { runSeeders, Seeder } from 'typeorm-extension';
import dbDataSource from 'config/data-source.config';

export class MainSeeder implements Seeder {
  async run() {
    await runSeeders(dbDataSource);
  }
}
