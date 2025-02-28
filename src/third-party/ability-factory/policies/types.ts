import { MongoAbility } from '@casl/ability';
import { Subjects } from 'src/third-party/ability-factory/types';

export interface IPolicyHandler {
  handle(ability: MongoAbility, subject: Subjects): boolean;
}

type PolicyHandlerCallback = (ability: MongoAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
