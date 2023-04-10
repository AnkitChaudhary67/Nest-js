import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './schemas/role.schema';
const moment = require('moment-timezone');

Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
private roleModel: Model<Role>,
  ){}
  async create(createRoleDto: CreateRoleDto):Promise<{roleUser:object}> {
    const {role,created_at,updated_at }=createRoleDto;

    const roleUser=await this.roleModel.create({
      role,
      created_at:moment().tz(this.getTimeZone()).format(),
      updated_at:moment().tz(this.getTimeZone()).format()
    })

    return {roleUser}
  }

  
  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
  getTimeZone():string{
    const offsetMinutes=new Date().getTimezoneOffset();
    const offsetHours=offsetMinutes/60;
    const offsetString=offsetHours>0?`+${offsetHours}`: offsetHours.toString();
    return  offsetString || 'UTC'
    }
  
}
