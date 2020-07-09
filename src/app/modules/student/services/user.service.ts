import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const API = 'http://localhost:8088/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _http: HttpClient) {
  }

  getInfo() {
    return this._http.get(API + 'user');
  }
}
