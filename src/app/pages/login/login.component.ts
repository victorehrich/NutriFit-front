import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  currentPath = ""
  constructor (private router:Router) {
    this.currentPath = this.router.url
  }
  onRedirectToHome(event:boolean){
    if(event) this.router.navigate(['/'])
  }
}
