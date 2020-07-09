import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};

  constructor(private _authService: AuthService) {
  }

  ngOnInit(): void {
  }

  register() {
    this._authService.register(this.form).subscribe(() => {

    })
  }

}
