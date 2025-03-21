import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signup form', () => {
    expect(component.signupForm).toBeDefined();
    expect(component.signupForm.controls['name']).toBeDefined();
    expect(component.signupForm.controls['email']).toBeDefined();
    expect(component.signupForm.controls['password']).toBeDefined();
    expect(component.signupForm.controls['confirmPassword']).toBeDefined();
  });

  it('should mark the form as invalid if required fields are missing', () => {
    component.signupForm.setValue({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    expect(component.signupForm.invalid).toBeTrue();
  });

  it('should validate password and confirmPassword match', () => {
    component.signupForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password456' // Different password
    });

    expect(component.signupForm.errors?.['passwordMismatch']).toBeTruthy();
  });

  it('should mark form as valid if all fields are correct', () => {
    component.signupForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    });

    expect(component.signupForm.valid).toBeTrue();
  });

  it('should call register method on successful signup', () => {
    authService.register.and.returnValue(of({ message: 'User registered successfully' }));

    component.signupForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    });

    component.signup();

    expect(authService.register).toHaveBeenCalledWith(component.signupForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(snackBar.open).toHaveBeenCalledWith('Registered Successfully!!', 'Close', jasmine.any(Object));
  });

  it('should handle registration error', () => {
    authService.register.and.returnValue(throwError(() => new Error('Registration failed')));

    component.signupForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    });

    component.signup();

    expect(authService.register).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Some Error Occurred!!', 'Close', jasmine.any(Object));
  });
});
