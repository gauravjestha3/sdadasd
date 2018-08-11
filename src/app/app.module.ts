import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SigninComponent } from './signin/signin.component';
import { AuthUserService } from './auth-user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Data } from './data';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  
} from "angular-6-social-login";


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
        
        provider: new GoogleLoginProvider("224889169940-kltbp3595h4sf82oj92h69h11gkqle5v.apps.googleusercontent.com")
        },
      ]);
    return config;
  }

const route:Routes=[
{
  path:   '',
  component:SigninComponent
},
{
  path:   'main',
  component:MainComponent
},
{
  path: 'main',
  component:MainComponent,
  canActivate:[AuthUserService]
},
{
  path: '**',
  component:SigninComponent
}

];
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    RouterModule.forRoot(route)
  ],
  providers: [AuthUserService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
