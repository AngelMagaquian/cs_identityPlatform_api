import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
@Controller('role')
export class RoleController {
    constructor(
        private RoleService: RoleService
    ) {}

    @Post('create')
    async createRole(@Body() body) {
        const {name, permissionIds} = body;
        return this.RoleService.createRole(name, permissionIds);
    }
}
