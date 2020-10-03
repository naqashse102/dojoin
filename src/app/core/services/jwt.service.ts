import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { Response } from 'src/app/shared/models/response';
import { JwtHttp } from '../http/jwt.http';

export const ACCESS_TOKEN = 'Access_Token';
export const REFRESH_TOKEN = 'Refresh_Token';
export const REMEMBER = 'Remember';

@Injectable({
    providedIn: 'root'
})

export class JwtService {

    refreshTokenTimeout;

    constructor(private jwt: JwtHttp) { }

    setRemember(remember: boolean) {
        localStorage.setItem(REMEMBER, new Boolean(remember).toString());
    }

    getRemember(): boolean {
        if (localStorage.getItem(REMEMBER) === 'true') {
            return true;
        }
        return false
    }

    setToken(token: string, refreshToken: string, tokenExpiry: Date, refreshTokenExpiry: Date): void {
        if (this.getRemember()) {
            localStorage.setItem(ACCESS_TOKEN, token);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            this.startRefreshTokenTimer(token, tokenExpiry)
            return;
        }

        sessionStorage.setItem(ACCESS_TOKEN, token);
        sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
    }

    getToken(): string {
        const token = localStorage.getItem(ACCESS_TOKEN);
        return token ? token : sessionStorage.getItem(ACCESS_TOKEN);
    }

    getRefreshToken(): string {
        const token = localStorage.getItem(REFRESH_TOKEN);
        return token ? token : sessionStorage.getItem(REFRESH_TOKEN);
    }

    isLoggedin(): boolean {
        if (this.isTokenExpired()) { return false; }
        return true;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) { token = this.getToken(); }
        if (!token) { return true; }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) { return false; }
        return !(date.valueOf() > new Date().valueOf());
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = decode(token);

        if (decoded.exp === undefined) { return null; }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    startRefreshTokenTimer(jwtToken: string, tokenExpiry: Date) {
        // parse json object from base64 encoded jwt token
        jwtToken = JSON.parse(atob(jwtToken.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(tokenExpiry);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);

        this.refreshTokenTimeout = setTimeout(() => {
            this.jwt
                .refreshToken(this.getToken(), this.getRefreshToken())
                .subscribe((res: Response) => {
                    this.setToken(res.result.accessToken, res.result.refreshToken, res.result.accessTokenExpireTime, res.result.refreshTokenExpireTime);
                    this.startRefreshTokenTimer(res.result.accessToken, res.result.accessTokenExpireTime)
                }, err => console.log(err))
        }, timeout);
    }

    stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    logout(): void {
        localStorage.removeItem(ACCESS_TOKEN);
        sessionStorage.removeItem(ACCESS_TOKEN);

        localStorage.removeItem(REFRESH_TOKEN);
        sessionStorage.removeItem(REFRESH_TOKEN);
        this.stopRefreshTokenTimer()
    }

}
