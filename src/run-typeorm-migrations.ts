import AppDataSource from "./orm.config";

AppDataSource.initialize()
  .then(() => {
    return AppDataSource.runMigrations();
  })
  .then(() => {
    console.log('Migrations executed successfully');
  })
  .catch((err) => {
    console.error('Error during migration run:', err);
  });
