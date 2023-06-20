import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SideLoginComponent } from './components/side-login/side-login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideForgetPasswordComponent } from './components/side-forget-password/side-forget-password.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeDisplayerComponent } from './components/home-displayer/home-displayer.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { UserInfosComponent } from './pages/user-infos/user-infos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { HeigthPipePipe } from './pipes/heigth-pipe.pipe';
import { UserInfosEditComponent } from './pages/user-infos-edit/user-infos-edit.component';
import { ErrorComponent } from './pages/error/error.component';
import { DefaultButtonComponent } from './components/default-button/default-button.component';
import { DietsComponent } from './pages/diets/diets.component';
import {MatCardModule} from '@angular/material/card';

export function tokenGetter() {
  return localStorage.getItem("sessionToken");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideLoginComponent,
    SideForgetPasswordComponent,
    SignupComponent,
    ChangePasswordComponent,
    HomeComponent,
    SidebarComponent,
    HomeDisplayerComponent,
    UserInfosComponent,
    LoaderComponent,
    HeigthPipePipe,
    UserInfosEditComponent,
    ErrorComponent,
    DefaultButtonComponent,
    DietsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        disallowedRoutes: ["",'esqueci-a-senha','cadastro'],
      },
    }),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
