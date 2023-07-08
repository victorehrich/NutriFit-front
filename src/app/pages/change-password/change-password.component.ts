import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  formChangePassWord!: FormGroup;
  passwordType = "password"
  showIconPath = "../../../assets/icons/PasswordInvisible.svg"
  message = '';

  constructor(private formBuilder: FormBuilder) {
    this.createForm()
  }

  createForm() {
    this.formChangePassWord = this.formBuilder.group({
      currentPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    });
  }

  changePassword() {
    if (this.formChangePassWord.valid) {
      const currentPassword = this.formChangePassWord.value.currentPassword;
      const newPassword = this.formChangePassWord.value.newPassword;
      const confirmPassword = this.formChangePassWord.value.confirmPassword;

      if (newPassword === confirmPassword) {
        // Perform password change logic
        // ...

        // Display success message
        this.message = 'Password changed successfully';

        // Reset the form
        this.formChangePassWord.reset();
      } else {
        this.message = 'New password and confirm password do not match';
      }
    } else {
      this.message = 'Please fill in all required fields';
    }
  }


  showPassword() {
    if (this.passwordType == "password") {
      this.passwordType = "text"
      this.showIconPath = "../../../assets/icons/PasswordVisible.svg"
    }
    else {
      this.passwordType = "password"
      this.showIconPath = "../../../assets/icons/PasswordInvisible.svg"
    }
  }
}
