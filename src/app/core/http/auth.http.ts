import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtService } from '../services/jwt.service';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/shared/models/response';

@Injectable({
    providedIn: 'root'
})

export class AuthHttp {
    constructor(
        private auth: JwtService,
        private http: HttpClient,
    ) { }


    private static handleError<T>(result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);

            if (error.status >= 400) {
                throw error.error ? error.error : error;
            }

            return of(result);
        };
    }

    signIn(body: any, remember: boolean) {
        return this.http.post(`${environment.identityBaseUrl}/Account/Login`, body)
            .pipe(
                tap((res: Response) => {
                    this.auth.setRemember(remember)
                    this.auth.setToken(res.result.accessToken, res.result.refreshToken, res.result.accessTokenExpireTime, res.result.refreshTokenExpireTime);
                    this.auth.startRefreshTokenTimer(res.result.accessToken, res.result.accessTokenExpireTime)
                    return res
                }),
                catchError(AuthHttp.handleError([])))
    }
}