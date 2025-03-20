import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no pending HTTP requests
    localStorage.clear(); // Clear storage after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login API and return token', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { access_token: 'fake-token' };

    service.login(credentials).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should update login state after receiving a token', () => {
    service.updateLogin('fake-token');
    expect(localStorage.getItem('token')).toBe('fake-token');
    service.isLoggedIn$.subscribe(status => {
      expect(status).toBeTrue();
    });
  });

  it('should remove token and update login state on logout', () => {
    localStorage.setItem('token', 'fake-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    service.isLoggedIn$.subscribe(status => {
      expect(status).toBeFalse();
    });
  });

  it('should return true if token exists', () => {
    localStorage.setItem('token', 'fake-token');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if token does not exist', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should call register API', () => {
    const user = { name: 'John Doe', email: 'john@example.com', password: 'pass123' };
    const mockResponse = { message: 'User registered successfully' };

    service.register(user).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should return the token if available', () => {
    localStorage.setItem('token', 'fake-token');
    expect(service.getToken()).toBe('fake-token');
  });

  it('should return null if no token is stored', () => {
    expect(service.getToken()).toBeNull();
  });
});
