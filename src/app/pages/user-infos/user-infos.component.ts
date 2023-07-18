import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user/user.interface';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss', '../../shared/styles/forms.scss'],
})
export class UserInfosComponent implements OnInit {
  user!:UserInterface
  isLoading:boolean = true
  imageUrl?: SafeUrl;
  constructor(private userService: UserService, private router:Router, private sanitizer : DomSanitizer) {}
  ngOnInit(): void {
    this.getCurrentUserInfos()
  }
  getCurrentUserInfos():void {
    this.isLoading = true
    this.userService.getUser().subscribe({
      next:(response: UserInterface)=>{
        this.user = response
        this.getImage(this.user.name)
      },
      error:(err:HttpErrorResponse)=>{
        console.error(err)
        window.alert(err.message)
        this.isLoading = false;
      }
    }
    )
  }
  getImage(name:string): void{
    this.isLoading = true;
    this.userService.getImage(name).subscribe({
      next: (response: any) => {
        if(response.file?.length > 0){
          let base64data = 'data:image/jpeg;base64,' + response.file;
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
            base64data!.toString()
          );
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        window.alert(err.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  navigateToEditUser(){
    this.router.navigate(['informacoes-do-usuario','editar',this.user.id])
  }
}
