import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../auth.types';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // -----------------------------------------------------------------------------------------------------
  // @ Attributes
  // ----------------------------------------------------------------------------------------------------

  maxDateRegister: any;

  formRegister: FormGroup;
  // error al usuario
  errorMessage= '';

  // -----------------------------------------------------------------------------------------------------
  // @ Constructor
  // ----------------------------------------------------------------------------------------------------

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Life Cycle
  // ----------------------------------------------------------------------------------------------------

  ngOnInit() {

    this._initForm();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // ----------------------------------------------------------------------------------------------------

  registerUser(): void {
    this.formRegister.disable();

    const user: User = this.formRegister.value;
    this._authService.registerUser(user).subscribe((response) => {
      console.log('success:', response);
        this._router.navigate(['./auth/signin'])
      this.formRegister.enable();
      }, (error) => {
      if('message' in error){
        console.log('hola linea 68');
        console.log(error.error.message);
        console.log(error.message)
        this.errorMessage=error.error.message;
        this.formRegister.enable();
      }
      }
    )
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // ----------------------------------------------------------------------------------------------------

  private _initForm(): void {
    this.formRegister = this._formBuilder.group({
      emailUserCinema: ['', [Validators.required, Validators.email]],
      usernameUserCinema: ['', [Validators.required]],
      passwordUserCinema: ['', Validators.required],
      nameUserCinema: ['', Validators.required],
      surnameUserCinema: ['', Validators.required],
      confirm_passwordUserCinema: ['', [Validators.required]]
    });
  }


}
