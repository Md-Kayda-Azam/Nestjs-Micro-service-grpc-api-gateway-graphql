// shared/guards/global.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { PermissionGuard } from './permission.guard';

@Injectable()
export class GlobalGuard implements CanActivate {
  constructor(
    @Inject(AuthGuard) private authGuard: AuthGuard, // AuthGuard ইনজেক্ট
    private permissionGuard: PermissionGuard, // PermissionGuard ইনজেক্ট
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authResult = await this.authGuard.canActivate(context);
    if (!authResult) return false;
    return await this.permissionGuard.canActivate(context);
  }
}
