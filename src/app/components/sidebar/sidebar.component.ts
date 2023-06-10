import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user/user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', '../../shared/styles/forms.scss'],
})
export class SidebarComponent {
  baseIconPath = "../../../assets/icons/"
  user:UserInterface = JSON.parse(localStorage.getItem("user") as string)
  itensSidebar = [
    {
      label: 'Minhas informações',
      icon: 'Person',
      path: '/minhas-informacoes/'+ this.user.id
    },
    {
      label: 'Minhas dietas',
      icon: 'Apple',
      path: '/minhas-dietas/'+ this.user.id
    },
    {
      label: 'Meus Treinos',
      icon: 'Weigth',
      path: '/meus-treinos/'+ this.user.id
    },
  ];
  
  constructor(private router:Router){

  }
  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.router.navigate(["/"])
  }
}
