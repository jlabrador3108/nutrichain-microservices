import { execSync } from 'child_process';
import * as path from 'path';
const name = `migration`;
const migrationsPath = path.resolve('src', 'common', 'database', 'migrations');
const dataSource = path.resolve('src', 'common', 'data-access','data-source.ts');

const command = `npm run typeorm migration:generate -- -d ${dataSource} ${migrationsPath}/${name}`;
console.log(`Generating migration: ${name}`);
execSync(command, { stdio: 'inherit' });
