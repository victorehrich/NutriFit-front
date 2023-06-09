import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor() {}

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      // Lógica de tratamento de erro para senhas não correspondentes
      return;
    }

    // Lógica de troca de senha
  }
}
