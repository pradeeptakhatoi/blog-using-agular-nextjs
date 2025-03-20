import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { MatCardModule } from '@angular/material/card'; // ✅ Import MatCardModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(response => {
      localStorage.setItem('token', response.access_token);
      this.router.navigate(['/posts']);
    }, error => {
      console.error('Login failed', error);
    });
  }
}
