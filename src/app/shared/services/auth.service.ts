import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public cookieService: CookieService) { }

  // FIXME: get user details from backend
  public getUserDetails(username, password) {
    if (username === 'admin' && password === 'admin') {
      return true;
    }
    if (username === 'test' && password === 'test') {
      return true;
    }
    return false;
  }

  // FIXME: check with backend if user is authenticated
  isAuthenticated() {
    return this.cookieService.check('username');
  }
}
