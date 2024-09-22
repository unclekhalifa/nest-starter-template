import { UserAuth } from './user-auth.decorator';
import { AdminGuard } from '../guards';

export function AdminAuth() {
  return UserAuth(AdminGuard);
}
