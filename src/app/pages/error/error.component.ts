import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  textButton: string = '';
  constructor(private authService: AuthService, private router: Router) {
    this.textButton = this.isAuthenticated()
      ? 'Voltar para a home'
      : 'Voltar para o login';
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated() && this.authService.getToken() != "";
  }
  goBack() {
    if (this.isAuthenticated()) this.router.navigate(['/home']);
    else {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
}
