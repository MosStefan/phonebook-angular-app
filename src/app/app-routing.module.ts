import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactListComponent } from './contact-list/contact-list.component' 
import { AddEditContactComponent } from './add-edit-contact/add-edit-contact.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  {path: 'contacts', component: ContactListComponent},
  {path: 'add-contact', component: AddEditContactComponent},
  {path: 'edit-contact', component: AddEditContactComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
