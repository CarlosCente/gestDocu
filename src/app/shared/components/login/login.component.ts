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
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  public  authUser: AuthUser ;

  constructor(

    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public userService: UsersService

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

        this.userService.login(this.authUser).subscribe( data => {
          console.log(data);
        });

      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}

