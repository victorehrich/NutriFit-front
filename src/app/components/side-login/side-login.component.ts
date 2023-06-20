import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginResponseInterface } from 'src/app/interfaces/login/login.response.interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-side-login',
  templateUrl: './side-login.component.html',
  styleUrls: ['./side-login.component.scss', '../../shared/styles/forms.scss']
})
export class SideLoginComponent {
  form!:FormGroup
  passwordType = "password"
  showIconPath = "../../../assets/icons/PasswordInvisible.svg"
  erroMsg = ""
  @Output() redirectToHome:EventEmitter<boolean> = new EventEmitter()
  constructor(
    private formBuilder: FormBuilder,
    private loginService:LoginService) {
    this.createForm()
    this.onChanges();
  }
  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      this.erroMsg = ""
    });
  }

  createForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.compose([Validators.required])],
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
        next:(token:LoginResponseInterface)=>{
          localStorage.removeItem("sessionToken")
          localStorage.removeItem("user")
          localStorage.setItem("sessionToken",token.token)
          let {password ,... user} = token.user
          localStorage.setItem("user",JSON.stringify(user))
          this.redirectToHome.emit(true);
        },
        error:(err:HttpErrorResponse)=>{
            this.erroMsg = err.error
            if(err.status == 0)
              this.erroMsg = "Ops, parece ter acontecido algum erro"
        }
      })
    }
  }
}
