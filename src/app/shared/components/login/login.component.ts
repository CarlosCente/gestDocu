import { AuthService } from './../../../services/auth.service';
import { AuthUser } from '../../../models/authUser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})

export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  private loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  private  authUser: AuthUser ;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {

    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  async onSubmit() {

    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    if (this.formLogin.valid) {
      try {
        const username = this.formLogin.get('username').value;
        const password = this.formLogin.get('password').value;

        this.authService.login(username, password).subscribe( data => {
          console.log("User is logged in");
          this.router.navigateByUrl('/default');
        });

      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}

