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

  /* En el userService se añade también la funcionalidad respecto a la autenticación y manejo del token*/
  login(authUser: AuthUser) : Observable<any>{
    return this.http.post(this.accesoLogin, authUser);

  }

  closeSession() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
