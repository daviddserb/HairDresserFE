import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { LogInComponent } from './account/log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  //! After adding the path, add it in routingComponents.
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'profile', component: ProfileComponent},
  
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  RegisterComponent,
  LogInComponent,
  ProfileComponent,
  PageNotFoundComponent
]