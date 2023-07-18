import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DietScheduleInterface } from 'src/app/interfaces/diet/diet.schedule.interface';
import { UserInterface } from 'src/app/interfaces/user/user.interface';
import { DietService } from 'src/app/services/diet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user!: UserInterface
  date = new Date().toLocaleDateString();
  isLoading: boolean = false;
  imageUrl?: SafeUrl;
  todayDiet?:DietScheduleInterface
  dietInfos = {
    label: 'Nenhuma refeição cadastrada ainda',
    sublabel: '-',
    body: [''],
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
  constructor(
    private userService: UserService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dietService: DietService,

  ) {}
  ngOnInit(): void {
    this.getCurrentUserInfos();
    this.getTodayDiet()
  }
  getTodayDiet():void{
    this.dietService.getTodayDiet().subscribe({
      next: (response: DietScheduleInterface) => {
        this.todayDiet = response;

        const hour = new Date().getHours()
        if(parseInt(this.todayDiet.morningMeal.endTime.split(":")[0]) > hour){
          let dishs:string[] = []
          this.todayDiet.morningMeal.dish.forEach(dish => {
            dishs.push(`${dish.dishName} (${dish.dishQuantity})`)  
          });
          this.dietInfos = {
            label: 'Minha Próxima refeição é:',
            sublabel: `${this.todayDiet.morningMeal.startTime.slice(0,5)}h - Café da manhã`,
            body: dishs
          };
        }
        else if(parseInt(this.todayDiet.afternoonMeal.endTime.split(":")[0]) > hour){
          let dishs:string[] = []
          this.todayDiet.afternoonMeal.dish.forEach(dish => {
            dishs.push(`${dish.dishName} (${dish.dishQuantity})`)  
          });
          this.dietInfos = {
            label: 'Minha Próxima refeição é:',
            sublabel: `${this.todayDiet.afternoonMeal.startTime.slice(0,5)}h - Almoço`,
            body: dishs
          };
        }
        else if(parseInt(this.todayDiet.nightMeal.endTime.split(":")[0]) > hour){
          let dishs:string[] = []
          this.todayDiet.nightMeal.dish.forEach(dish => {
            dishs.push(`${dish.dishName} (${dish.dishQuantity})`)  
          });
          this.dietInfos = {
            label: 'Minha Próxima refeição é:',
            sublabel: `${this.todayDiet.nightMeal.startTime.slice(0,5)}h - Jantar`,
            body: dishs
          };
        }
        else{
          this.dietInfos = {
            label: 'Aguarde até o outro dia:',
            sublabel: `-`,
            body: []
          };
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  getCurrentUserInfos(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (response: UserInterface) => {
        this.user = response;
        this.getImage(this.user.name);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        window.alert(err.message);
        this.isLoading = false;
      },
    });
  }
  getImage(name: string): void {
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
}
