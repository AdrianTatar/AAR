import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timestamp' })
export class TimestampPipe implements PipeTransform {
    transform(value: any): any {
        return value.year + '.' + value.monthValue + '.' + value.dayOfMonth
            + ' ' + value.hour + ':' + value.minute + ':' + value.second;
    }
}
