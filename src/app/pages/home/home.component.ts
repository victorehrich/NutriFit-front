import { Component } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user:UserInterface = JSON.parse(localStorage.getItem("user") as string)
  date = new Date().toLocaleDateString()
  dietInfos = {
    label: 'Minha Próxima refeição é:',
    sublabel: '12:00 - Almoço',
    body: [
      'Filé de peixe Grelhado (100g)',
      'Arroz integral (100g)',
      'Salada (a vontade)',
    ],
  };
  exerciseInfos = {
    label: 'Meu treino do dia é:',
    sublabel: 'Treino - A (perna)',
    body: [
      'Supino reto (3x12)',
      'Crucifixo (3x12)',
      'Rosca francesa (3x12)',
      'Supino reto (3x12)',
      'Rosca francesa (3x12)',
      'Rosca francesa (3x12)',
      'Rosca francesa (3x12)',
    ],
  };
}
