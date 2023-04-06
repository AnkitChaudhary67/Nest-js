import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';




@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

//   getTime():string {
//     return moment().tz("America/Los_Angeles").format()
//      const offsetMinutes=new Date().getTimezoneOffset();
//      const offsetHours=offsetMinutes/60;
    
//     const offsetString=offsetHours>0?`+${offsetHours}`: offsetHours.toString();
    
//      return moment.tz.zone(offsetString).abbr(223222222222) ||'UTC';
//   }
}




