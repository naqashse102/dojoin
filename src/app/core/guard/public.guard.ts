import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

@Injectable({
    providedIn: 'root'
})
export class PublicGuard implements CanActivate {
    constructor(private router: Router, private jwt: JwtService) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        /**
        *get user object from local storage
        *@param {object} validator will be true if object find else validator will be false
        */
        let validator = !this.jwt.isLoggedin()
        validator ? {} : this.router.navigate(['']);
        return validator;
    }
}
