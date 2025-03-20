import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  isLoggedIn$ = this.loggedIn.asObservable(); // Observable to track login status

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  updateLogin(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true); // Notify subscribers
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false); // Notify subscribers
  }

  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  googleLogin() {
    window.location.href = `${this.apiUrl}/google`; // Redirects to Google Auth
  }

  facebookLogin() {
    window.location.href = `${this.apiUrl}/facebook`; // Redirects to Facebook Auth
  }
}
