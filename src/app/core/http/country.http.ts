import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Country } from 'src/app/shared/models/country';
import { Response } from 'src/app/shared/models/response';

@Injectable({
    providedIn: 'root'
})
export class CountryHttp {
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

    getCountries(): Observable<Country[]> {
        return this.http.get(`${environment.identityBaseUrl}/Country`)
            .pipe(map((res: Response) => {
                return res.result.map(country => new Country(country));
            }),
            tap((res) => {}),
            catchError(CountryHttp.handleError([])))
    }
}