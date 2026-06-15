import { SetMetadata } from '@nestjs/common';
import { MembersRoles } from '../enums/members-roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: MembersRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
