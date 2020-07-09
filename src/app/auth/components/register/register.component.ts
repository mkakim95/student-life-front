import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};

  constructor(private _authService: AuthService,
              private _toastrService: ToastrService,
              private _router: Router) {
  }

  ngOnInit(): void {
  }

  register() {
    this._authService.register(this.form).subscribe((data) => {
      this._toastrService.success(data.message);
      this._router.navigateByUrl('/login');
    });
  }

}
