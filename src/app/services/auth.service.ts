import { shareReplay } from 'rxjs/operators';
import { AuthUser } from './../models/AuthUser';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    urlApi: string = "http://localhost:8080/api/auth/";

    constructor(private http: HttpClient) {
    }

    login(authUser: AuthUser ) {
        return this.http.post<AuthUser>(this.urlApi + "signin", authUser)
            // this is just the HTTP call,
            // we still need to handle the reception of the token
            .pipe(shareReplay());
    }
}
