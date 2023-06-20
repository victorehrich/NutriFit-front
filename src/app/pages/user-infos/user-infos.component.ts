import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss', '../../shared/styles/forms.scss'],
})
export class UserInfosComponent implements OnInit {
  user!:UserInterface
  isLoading:boolean = true
  constructor(private userService: UserService, private router:Router) {}
  ngOnInit(): void {
    this.getCurrentUserInfos()
  }
  getCurrentUserInfos():void {
    this.isLoading = true
    this.userService.getUser().subscribe({
      next:(response: UserInterface)=>{
        this.user = response
      },
      error:(err:HttpErrorResponse)=>{
        console.error(err)
        window.alert(err.message)
      },
      complete:()=>{
        this.isLoading = false
      }
    }
    )
  }
  navigateToEditUser(){
    this.router.navigate(['informacoes-do-usuario','editar',this.user.id])
  }
}
