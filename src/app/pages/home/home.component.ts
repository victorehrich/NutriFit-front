import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user/user.interface';
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
  constructor(
    private userService: UserService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getCurrentUserInfos();
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
        let base64data = 'data:image/jpeg;base64,' + response.file;
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
          base64data!.toString()
        );
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
