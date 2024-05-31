import { v4 } from 'uuid';

export function generateUUid(): string {
  return v4();
}
