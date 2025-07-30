import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLE_KEY } from "./roles.decorations";

export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>(ROLE_KEY, context.getHandler());
        if (!roles) {
            return true; // No roles defined, allow access
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.roles) {
            return false; // User not authenticated or no roles assigned
        }

        return roles.some(role => user.roles.includes(role));
    }
}

export enum Role {
  Admin = 'Admin',
  Staff = 'Staff',
  Residents = 'Residents',
}