import { config } from 'dotenv';
//import { assertDefined } from 'src/lib/utils/assert-defined.util';
import { DataSource } from 'typeorm';

config();

const env = process.env;

export const assertDefined = <T>(val: T): T => {
  if (val === undefined) {
    //throw new AssertDefinedException('Value must be defined.');
    throw new Error();
  }

  return val;
};

const dataSource = new DataSource({
  type: 'postgres',
  host: assertDefined(env.POSTGRES_HOST),
  port: Number(assertDefined(env.POSTGRES_PORT)),
  username: assertDefined(env.POSTGRES_USER),
  password: assertDefined(env.POSTGRES_PASSWORD),
  database: assertDefined(env.POSTGRES_DB),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.[tj]s'],
});

export default dataSource;
