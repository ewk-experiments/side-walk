import { Relationship } from './game';

export interface PersonTemplate {
  name: string;
  type: Relationship['type'];
  occupation?: string;
  baseCloseness: number;
  baseDrama: number;
}
