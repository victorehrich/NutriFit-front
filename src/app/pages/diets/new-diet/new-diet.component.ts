import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Subscription, concat, toArray } from 'rxjs';
import { DietCreateInterface } from 'src/app/interfaces/diet/diet.create.interface';
import { State } from 'src/app/interfaces/responses/state.interface';
import { UserInterface } from 'src/app/interfaces/user/user.interface';
import { UserUpdateInterface } from 'src/app/interfaces/user/user.update.interface';
import { DietService } from 'src/app/services/diet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-diet',
  templateUrl: './new-diet.component.html',
  styleUrls: ['./new-diet.component.scss', '../../../shared/styles/forms.scss'],
})
export class NewDietComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  form!: FormGroup;
  isLoading: boolean = false;
  user!: UserInterface;
  allergies: string[] = [];
  addOnBlur: boolean = true;
  loadingButton: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dietService: DietService,
    private router: Router
  ) {
    this.getUserInfo();
  }
  createForm(user: UserInterface): void {
    this.form = this.formBuilder.group({
      email: [
        { value: user.email, disabled: true },
        Validators.compose([Validators.required, Validators.email]),
      ],
      name: [
        { value: user.name, disabled: true },
        Validators.compose([Validators.required]),
      ],
      sexId: [user.sexId, Validators.compose([Validators.min(1)])],
      biotypeId: [user.biotypeId, Validators.compose([Validators.min(1)])],
      heigth: [user.heigth, Validators.compose([Validators.required])],
      weigth: [user.weigth, Validators.compose([Validators.required])],
      age: [
        user.age,
        Validators.compose([Validators.min(0), Validators.max(140)]),
      ],
      goals: ['', Validators.compose([])],
      dietName: ['', Validators.compose([])],
    });
  }
  getUserInfo(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (response: UserInterface) => {
        this.user = response;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.router.navigate(['pagina-de-erro']);
      },
      complete: () => {
        this.createForm(this.user);
        this.isLoading = false;
      },
    });
  }
  preventNumbers(event: any): void {
    const pattern = /^[a-zA-Z\s]+$/;
    let inputChar = event.key;
    if (!pattern.test(inputChar)) {
      event.target.value = '';
      event.preventDefault();
    }
  }
  add(event: MatChipInputEvent): void {
    const pattern = /^[a-zA-Z\s]+$/;
    if (!pattern.test(event.value)) {
      return;
    }
    const value = (event.value || '').trim();
    const alreadyInArray = this.allergies.find((allergie) => allergie == value);
    if (value && !alreadyInArray) {
      this.allergies.push(value);
    }

    event.chipInput!.clear();
  }

  remove(allergie: string): void {
    const index = this.allergies.indexOf(allergie);

    if (index >= 0) {
      this.allergies.splice(index, 1);
    }
  }

  async sendForm(): Promise<void> {
    if (this.form.invalid) return;

    this.loadingButton = true;
    this.updateUser();

  }
  updateUser(): void {
    const formRaw = this.form.getRawValue();
    let updateUserCommand: UserUpdateInterface = {
      userId: this.user.id,
      email: formRaw.email,
      password: '',
      name: formRaw.name,
      sexId: formRaw.sexId,
      biotypeId: formRaw.biotypeId,
      heigth: formRaw.heigth,
      weigth: formRaw.weigth,
      age: formRaw.age,
    };

    this.userService.updateUser(updateUserCommand).subscribe({
      next: (response: State<UserInterface>) => {
        this.createDiet();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.router.navigate(['pagina-de-erro']);
      },
      complete: () => {},
    });
  }
  createDiet(): void {
    const formRaw = this.form.getRawValue();
    let form: DietCreateInterface = {
      dietGoal: formRaw.goals,
      dietName: formRaw.dietName,
      dietAllergies: this.allergies,
    };
    this.dietService.createDiet(form).subscribe({
      next: (response: State<DietCreateInterface>) => {
        this.router.navigate(['minhas-dietas']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.router.navigate(['pagina-de-erro']);
      },
      complete: () => {
        this.loadingButton = false;
      },
    });
  }
}
