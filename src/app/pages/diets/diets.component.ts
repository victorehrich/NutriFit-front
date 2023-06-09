import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DietCreateInterface } from 'src/app/interfaces/diet/diet.create.interface';
import { DietInterface } from 'src/app/interfaces/diet/diet.interface';
import { State } from 'src/app/interfaces/responses/state.interface';
import { DietService } from 'src/app/services/diet.service';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.scss'],
})
export class DietsComponent implements OnInit {
  isLoading = false;
  diets?: DietInterface[] = [];
  currentDiet?: DietInterface;
  showEmptyScreen: boolean = true;
  constructor(private dietService: DietService, private router: Router) {}
  ngOnInit(): void {
    this.getDiets();
  }
  getDiets(): void {
    this.isLoading = true;
    this.dietService.getDiets().subscribe({
      next: (response: DietInterface[]) => {
        if (response.length > 0) {
          this.showEmptyScreen = false;
          response.forEach((diet) => {
            if (diet.currentActive) this.currentDiet = diet;
            else this.diets?.push(diet);
          });
        } else {
          this.showEmptyScreen = true;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error(err)
        this.router.navigate(['pagina-de-erro']);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  goToDiet(diet: DietInterface) {
    this.router.navigate(['minhas-dietas',diet.dietId])
  }
  updateDietStatus(dietId:number){
    this.isLoading = true;
    let result = window.confirm("Tem certeza que deseja alterar a dieta padrão?")
    if(!result) return
    this.dietService.updateDietStatus(dietId).subscribe({
      next: (response: State<DietCreateInterface>) => {
        this.diets = []
        this.getDiets()
      },
      error: (err: HttpErrorResponse) => {
        console.error(err)
        this.router.navigate(['pagina-de-erro']);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  goToNewDiet(){
    this.router.navigate(['nova-dieta'])
  }
}
