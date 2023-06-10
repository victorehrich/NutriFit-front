import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

import { ChangePasswordComponent } from './pages/change-password/change-password.component';

import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [ 
  { path: '', component: LoginComponent },
  { path: 'esqueci-a-senha', component: LoginComponent },
  { path: 'cadastro', component: ChangePasswordComponent },
  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
