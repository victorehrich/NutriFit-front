import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { UserInfosComponent } from './pages/user-infos/user-infos.component';
import { UserInfosEditComponent } from './pages/user-infos-edit/user-infos-edit.component';
import { ErrorComponent } from './pages/error/error.component';
import { DietsComponent } from './pages/diets/diets.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'esqueci-a-senha', component: LoginComponent },
  { path: 'cadastro', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'informacoes-do-usuario', component: UserInfosComponent, canActivate: [AuthGuard] },
  { path: 'informacoes-do-usuario/editar/:userId', component: UserInfosEditComponent, canActivate: [AuthGuard] },
  { path: 'trocar-senha', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'minhas-dietas', component: DietsComponent, canActivate: [AuthGuard] },
  { path: 'pagina-de-erro', component: ErrorComponent},
  { path: '**', component: ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}
