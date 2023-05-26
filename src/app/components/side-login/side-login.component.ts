import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-side-login',
  templateUrl: './side-login.component.html',
  styleUrls: ['./side-login.component.scss']
})
export class SideLoginComponent {
  form!:FormGroup
  passwordType = "password"
  showIconPath = "../../../assets/icons/PasswordInvisible.svg"

  constructor(private formBuilder: FormBuilder,
    private loginService:LoginService){
    this.createForm()
  }

  createForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  showPassword(){
    if(this.passwordType == "password"){
      this.passwordType = "text"
      this.showIconPath = "../../../assets/icons/PasswordVisible.svg"
    }
    else{
      this.passwordType = "password"
      this.showIconPath = "../../../assets/icons/PasswordInvisible.svg"
    }
  }
  login(){
    if(this.form.valid){
      const login = {
        email:this.form.controls['email'].value,
        password:this.form.controls['password'].value
      }
      this.loginService.login(login).subscribe({
        next:(token:string)=>{
          localStorage.setItem("sessionToken",JSON.stringify(token))
        },
        error:(err:HttpErrorResponse)=>{
          alert(err.message)
        }
      })
    }
  }
}
