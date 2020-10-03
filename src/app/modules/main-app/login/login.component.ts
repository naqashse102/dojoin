import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthHttp } from 'src/app/core/http/auth.http';
import { Country } from 'src/app/shared/models/country';
import { ToastrService } from 'ngx-toastr';
import { CountryHttp } from 'src/app/core/http/country.http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  hidePassword: Boolean = true;
  loginForm: FormGroup;
  countries: Country[];

  @ViewChild('form', { static: false }) myNgForm;

  constructor(
    private formBuilder: FormBuilder,
    private authHttp: AuthHttp,
    private countryHttp: CountryHttp,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      countryCode: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false, [])
    });
  }

  ngOnInit(): void {
    this.countryHttp.getCountries().subscribe((res: Country[]) => {
      this.countries = res;
    }, err => {
      this.toastr.error(err.errorMessage);
    })
  }

  // User Login Request Handler
  loginHandler(): void {
    if (this.loginForm.valid) {
      this.authHttp.signIn({
        countryId: this.loginForm.value.countryCode,
        username: this.loginForm.value.phoneNumber,
        password: this.loginForm.value.password,
        expiresInMinute: 15
      }, this.loginForm.value.rememberMe)
        .subscribe(res => {
          this.loginForm.reset();
          this.toastr.success('Logged in successfully');
          this.router.navigate([''])
        }, err => {
          this.toastr.error(err.errorMessage);
        })
    }
  }
}
