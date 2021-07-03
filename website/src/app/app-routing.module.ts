import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from "./components/login/login.component"
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from "./guards/login.guard"
import { LibraryComponent } from "./components/library/library.component";
import { BookComponent } from './components/book/book.component';
import { ReminderComponent } from './components/reminder/reminder.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [LoginGuard],
    children: [
      { path: '', component: LibraryComponent, canActivate: [LoginGuard] },
      { path: 'library/:id', component: BookComponent, canActivate: [LoginGuard] },
      { path: 'calendar', component: ReminderComponent, canActivate: [LoginGuard]}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}