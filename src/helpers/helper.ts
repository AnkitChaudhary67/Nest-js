import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import jwt_decode from 'jwt-decode';
import { sign } from 'jsonwebtoken';
const moment = require('moment-timezone');

export class Helper{
    constructor(  ) {}

     createAcesstoken(payload:object):string{
       return sign(
            payload,
            process.env.SECRET_KEY, { expiresIn: '12h' }
        );
    }


    decodeAcesstoken(token:string):object{
        return jwt_decode(token);
    }

     timeZone():string{
        return 'America/Edmonton'
     }

     created():string{
        return moment().tz('America/Edmonton').format()
     }
     updated():string{
        return moment().tz('America/Edmonton').format()
     }

    

}