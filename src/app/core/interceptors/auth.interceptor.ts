/**
 * Interceptor for adding auth token
 */
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { Router } from '@angular/router';

import { JwtService } from '../services/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private jwt: JwtService) { }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        let handle;
        const token = this.jwt.getToken();

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token)
            });

            handle = next.handle(cloned);

        }
        else {

            handle = next.handle(req);
        }

        return handle.pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {

                }
            }),
            catchError(err => {
                if (err.status == 401) {
                    this.router.navigateByUrl("/auth/login")
                }
                return throwError(err)
            })
        );
    }
}