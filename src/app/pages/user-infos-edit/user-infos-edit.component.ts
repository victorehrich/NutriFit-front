import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { State } from 'src/app/interfaces/responses/state.interface';
import { UserInterface } from 'src/app/interfaces/user/user.interface';
import { UserUpdateInterface } from 'src/app/interfaces/user/user.update.interface';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-infos-edit',
  templateUrl: './user-infos-edit.component.html',
  styleUrls: [
    './user-infos-edit.component.scss',
    '../user-infos/user-infos.component.scss',
    '../../shared/styles/forms.scss',
  ],
})
export class UserInfosEditComponent {
  user!: UserInterface;
  isLoading: boolean = true;
  form!: FormGroup;
  isLoadingButton: boolean = false;
  file!: File;
  imageUrl?: any;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
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
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        window.alert(err.message);
      },
      complete: () => {
        this.createForm(this.user);
        this.getImage(this.user.name);
      },
    });
  }
  getImage(name: string) {
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
  createForm(user: UserInterface): void {
    this.form = this.formBuilder.group({
      email: [
        user.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      age: [
        user.age,
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
      weigth: [user.weigth, Validators.compose([Validators.required])],
      heigth: [user.heigth, Validators.compose([Validators.required])],
      biotypeId: [user.biotypeId, Validators.compose([Validators.required])],
      sexId: [user.sexId, Validators.compose([Validators.required])],
    });
  }
  isFormInvalid(): boolean {
    return this.form.invalid;
  }
  sendForm(): void {
    if (this.isFormInvalid()) return;
    this.isLoadingButton = true;
    let form = this.form.getRawValue();
    let user: UserUpdateInterface = {
      userId: this.user.id,
      name: this.user.name,
      password: this.user.password,
      email: form.email,
      sexId: form.sexId,
      biotypeId: form.biotypeId,
      heigth: form.heigth,
      weigth: form.weigth,
      age: form.age,
    };
    this.userService.updateUser(user).subscribe({
      next: (response: State<UserInterface>) => {
        window.alert('Sucesso, redirecionando...');
        this.router.navigate(['informacoes-do-usuario']);
      },
      error: (err: HttpErrorResponse) => {
        window.alert(err.message);
        if (err.status == 401) {
          localStorage.clear();
          this.router.navigate(['']);
        }
        this.isLoadingButton = false;
      },
      complete: () => {
        this.isLoadingButton = false;
      },
    });
  }
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  onUpload() {
    this.isLoading = !this.isLoading;
    console.log(this.file);
    this.userService
      .uploadImage(this.file, `${this.user.id} - ${this.user.name}`)
      .subscribe({
        next: (response: State<null>) => {
          window.alert(response.message);
        },
        error: (response: State<null>) => {
          window.alert(response.message);
        },
        complete: () => {
          this.getCurrentUserInfos();
          this.isLoading = false;
        },
      });
  }
}
