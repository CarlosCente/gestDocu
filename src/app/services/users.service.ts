import { Router } from '@angular/router';
import { AuthUser } from './../models/AuthUser';
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  accesoLogin = "http://localhost:8080/api/auth/signin";

  constructor(
    private http: HttpClient,
    private router: Router) {}

  closeSession() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
