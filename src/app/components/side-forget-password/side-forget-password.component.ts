import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-side-forget-password',
  templateUrl: './side-forget-password.component.html',
  styleUrls: ['./side-forget-password.component.scss']
})
export class SideForgetPasswordComponent {
  form!:FormGroup
  passwordType = "password"
  showIconPath = "../../../assets/icons/PasswordInvisible.svg"

  constructor(private formBuilder: FormBuilder,
    private loginService:LoginService){
    this.createForm()
  }

  createForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  recoveryPassword(){
    if(this.form.valid){
      this.loginService.recoveryPassword(this.form.controls["email"].value)
    }
  }
}
