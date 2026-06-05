import { Request } from 'express';

export type TRequestUserMetadata = Request & {
  user: { id: number; name: string };
};
