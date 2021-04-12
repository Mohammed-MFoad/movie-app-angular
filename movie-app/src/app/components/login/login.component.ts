import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  backWithErro = false;
  message: string = '';

  emailAddress: string;
  password: string;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
       email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isValidInput(fieldName): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }
  validateRequired(fieldName) {
    return this.loginForm.controls[fieldName].errors.required;
  }
  validatePattern(fieldName) {
    return this.loginForm.controls[fieldName].errors.pattern;
  }
  validateLength(fieldName) {
    return this.loginForm.controls[fieldName].errors.minLength;
  }

  get f() {
    return this.loginForm.controls;
  }
  login(): void {
    console.log(this.loginForm.value);
    this.submitted = true;
    this.message = '';

    if (this.loginForm.invalid) {
      return;
    }
    this.emailAddress = this.loginForm.value.email
    this.password = this.loginForm.value.password
    this.loading = true;
    this.authService.signIn(this.emailAddress, this.password);
    this.emailAddress = this.password = '';
  }
  logout(): void {
    console.log('User is successfully logged out.')
    this.authService.signOut();
  }
}
