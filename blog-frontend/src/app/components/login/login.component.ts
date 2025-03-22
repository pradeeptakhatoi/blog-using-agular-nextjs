import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { MatCardModule } from '@angular/material/card'; // ✅ Import MatCardModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule
  ]
})
export class LoginComponent  implements OnInit {
  credentials = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // If User is already loggedin then redirect to Home Page
    this.authService.isLoggedIn$.subscribe(status => {
      if (status) {
        this.router.navigate(['/'])
      }
    });
  }

  login() {
    this.authService.login(this.credentials).subscribe((response: any) => {
      this.authService.updateLogin(response.access_token);
      this.router.navigate(['/posts']);
    }, error => {
      console.error('Login failed', error);
      this.showError(error?.message || "Error Occured");
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }

  loginWithGoogle() {
    this.authService.googleLogin();
  }

  loginWithFacebook() {
    this.authService.facebookLogin();
  }
}
