import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;

  constructor(private _tokenStorage: TokenStorageService,
              private _userService: UserService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = this._tokenStorage.getUser();
    let token = this._tokenStorage.getToken();

    this._userService.getInfo().subscribe(res => {

    });

  }

  logout() {
    this._tokenStorage.signOut();
  }

}
