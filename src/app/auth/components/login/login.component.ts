import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {Utils} from '../../services/utils/Utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private _authService: AuthService,
              private _tokenStorage: TokenStorageService,
              private _utils: Utils,
              private _router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this._utils.blockStart();
    this._authService.login(this.form).subscribe(
      data => {
        setTimeout(() => {
          this._tokenStorage.saveToken(data.token);
          this._tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this._router.navigateByUrl('/home');

          this._utils.blockStop();
        }, 1000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  logout() {
    this._tokenStorage.signOut();
  }
}
