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
  itensSidebar = [
    {
      label: 'Minhas informações',
      icon: 'Person',
      path: '/informacoes-do-usuario/'
    },
    {
      label: 'Minhas dietas',
      icon: 'Apple',
      path: '/minhas-dietas/'
    },
    {
      label: 'Meus Treinos',
      icon: 'Weigth',
      path: '/meus-treinos/'
    },
  ];
  
  constructor(private router:Router){

  }
  logout(){
    localStorage.clear()
    this.router.navigate(["/"])
  }
}
