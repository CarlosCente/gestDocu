import { AuthService } from './../../../services/auth.service';
import { AuthUser } from './../../../models/AuthUser';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
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

        this.authUser = {
          username: username,
          password: password
        };

        this.authService.login(this.authUser).subscribe( data => {
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

