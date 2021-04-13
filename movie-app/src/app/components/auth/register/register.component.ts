import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
 
  registerationForm: FormGroup;
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
    this.registerationForm = this.formBuilder.group({
       email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isValidInput(fieldName): boolean {
    return (
      this.registerationForm.controls[fieldName].invalid &&
      (this.registerationForm.controls[fieldName].dirty ||
        this.registerationForm.controls[fieldName].touched)
    );
  }
  validateRequired(fieldName) {
    return this.registerationForm.controls[fieldName].errors.required;
  }
  validatePattern(fieldName) {
    return this.registerationForm.controls[fieldName].errors.pattern;
  }
  validateLength(fieldName) {
    return this.registerationForm.controls[fieldName].errors.minLength;
  }

  get f() {
    return this.registerationForm.controls;
  }
  register(): void {
    console.log(this.registerationForm.value);
    this.submitted = true;
    this.message = '';

    if (this.registerationForm.invalid) {
      return;
    }
    this.emailAddress = this.registerationForm.value.email
    this.password = this.registerationForm.value.password
    this.loading = true;
    this.authService.signUp(this.emailAddress, this.password);
    this.emailAddress = this.password = '';
  }


  logout(): void {
      console.log('User is successfully logged out.')
      this.authService.signOut();
    }
}
