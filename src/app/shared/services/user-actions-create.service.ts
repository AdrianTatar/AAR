import { Injectable } from '@angular/core';
import { UserAction } from '../models/user.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserActionsCreateService {

  private userActionUrl = '/userAction';
  private savePath = '/create';
  
  constructor(private http: HttpClient) { }
  
  // FIXME: User hardcodat.
  public createUserAction(action: string) {
    const userAction = {} as UserAction;
    userAction.action = action;
    userAction.time = this.createTodayDateAsTimestamp();
    userAction.userId = 'hardcodat@urss.ro';

    return this.http.post<UserAction>(this.userActionUrl + this.savePath,
      JSON.stringify(userAction), httpOptions).subscribe(res => {
      console.log(res);
    });
  }

  // Format: "2018-08-11T14:30:15.312"
  private createTodayDateAsTimestamp() {
    const date = new Date();
    return date.getFullYear().toString() + '-'
      + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) + '-'
      + (date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()) + 'T'
      + (date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString()) + ':'
      + (date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString()) + ':'
      + (date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString()) + '.'
      + date.getMilliseconds().toString();
  }
}
