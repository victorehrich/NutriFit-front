import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { State } from 'src/app/interfaces/responses/state.interface';
import { UserCreateInterface } from 'src/app/interfaces/user/user.create.interface';
import { UserInterface } from 'src/app/interfaces/user/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss','../../shared/styles/forms.scss']
})
export class SignupComponent {
  form!:FormGroup
  passwordType = "password"
  showIconPath = "../../../assets/icons/PasswordInvisible.svg"
  confirmPasswordType = "password"
  confirmShowIconPath = "../../../assets/icons/PasswordInvisible.svg"
  erroMsg = ""
  constructor(private formBuilder: FormBuilder,
    private userService:UserService,private router:Router){
    this.createForm()
  }

  createForm(): void{
    this.form = this.formBuilder.group({
      name:['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password:['', Validators.compose([Validators.required])],
      confirmPassword:['', Validators.compose([Validators.required])],
      sexId:[0, Validators.compose([Validators.min(1)])],
      biotypeId:[0, Validators.compose([Validators.min(1)])],
      heigth:["", Validators.compose([Validators.required])],
      weigth:["",Validators.compose([Validators.required])],
      age:["", Validators.compose([Validators.required, Validators.min(0), Validators.max(140)])],
    });
  }
  showPassword(option:string): void{
    console.log(this.form)
    switch(option){
      case 'password':
        if(this.passwordType == "password"){
          this.passwordType = "text"
          this.showIconPath = "../../../assets/icons/PasswordVisible.svg"
        }
        else{
          this.passwordType = "password"
          this.showIconPath = "../../../assets/icons/PasswordInvisible.svg"
        }
        break
      case 'confirmPassword':
        if(this.confirmPasswordType == "password"){
          this.confirmPasswordType = "text"
          this.confirmShowIconPath = "../../../assets/icons/PasswordVisible.svg"
        }
        else{
          this.confirmPasswordType = "password"
          this.confirmShowIconPath = "../../../assets/icons/PasswordInvisible.svg"
        }
        break
      default:
        break
    }
  }
  releaseButton(): boolean{
    let password = this.form.controls['password'].value
    let confirmPassword = this.form.controls['confirmPassword'].value
    return this.form.valid && password === confirmPassword
  }
  createUser(): void{
    if(this.releaseButton()){
      let form = this.form.getRawValue()
      delete form.confirmPassword
      const createUser:UserCreateInterface = form
      this.userService.createUser(createUser).subscribe({
        next:(token:State<UserInterface>)=>{
          this.router.navigate(['/'])
        },
        error:(err:HttpErrorResponse)=>{
          this.erroMsg = err.error
        }
      })
    }
  }
}
