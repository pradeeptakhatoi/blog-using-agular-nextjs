import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login', 'updateLogin', 'googleLogin', 'facebookLogin']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize credentials with empty values', () => {
    expect(component.credentials.email).toBe('');
    expect(component.credentials.password).toBe('');
  });

  it('should login successfully and navigate to posts', () => {
    const mockResponse = { access_token: 'test-token' };
    authService.login.and.returnValue(of(mockResponse));

    component.credentials = { email: 'test@example.com', password: 'password123' };
    component.login();

    expect(authService.login).toHaveBeenCalledWith(component.credentials);
    expect(authService.updateLogin).toHaveBeenCalledWith('test-token');
    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
  });

  it('should show error message on login failure', () => {
    const errorResponse = { message: 'Invalid credentials' };
    authService.login.and.returnValue(throwError(() => errorResponse));

    component.credentials = { email: 'wrong@example.com', password: 'wrongpass' };
    component.login();

    expect(authService.login).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Invalid credentials', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  });

  it('should call Google login', () => {
    component.loginWithGoogle();
    expect(authService.googleLogin).toHaveBeenCalled();
  });

  it('should call Facebook login', () => {
    component.loginWithFacebook();
    expect(authService.facebookLogin).toHaveBeenCalled();
  });
});
