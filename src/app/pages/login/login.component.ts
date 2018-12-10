import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  response = true;

  @ViewChild('name') nameField: ElementRef;

  ngOnInit() {
    this.nameField.nativeElement.focus();
  }

  constructor(
    public authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  loginUser() {
    if (!this.username || !this.password) {
      this.response = false;
      return false;
    }
    this.response = this.authService.getUserDetails(this.username, this.password);
    if (this.response === true) {
      this.cookieService.set('username', this.username);
      this.router.navigate(['fixed-prices']);
    }
  }

}
