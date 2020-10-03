import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/shared/models/response';

@Injectable({
    providedIn: 'root'
})
export class JwtHttp {
    constructor(
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

    refreshToken(accessToken: string, refreshToken: string) {
        return this.http.post(`${environment.identityBaseUrl}/Account/RenewToken`, {
            accessToken,
            refreshToken
        })
            .pipe(
                tap((res: Response) => {
                    return res
                }),
                catchError(JwtHttp.handleError([])))
    }
}