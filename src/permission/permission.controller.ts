import { Body, Controller, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
@Controller('permission')
export class PermissionController {
    constructor(private PermissionService: PermissionService) {}
    @Post('create')
    async register(@Body() body) {
        const {module, read, create, update} = body;
        return this.PermissionService.createPermission(module, read, create, update);
    }
}
