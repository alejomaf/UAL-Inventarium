import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PasswordRecoveryComponent } from './components/login/password-recovery/password-recovery.component';
import { AddDataComponent } from './components/main/admin/add-data/add-data.component';
import { MainComponent } from './components/main/main.component';
import { AddObjectComponent } from './components/main/parts/add-object/add-object.component';
import { SelectObjectToCreateComponent } from './components/main/parts/add-object/select-object-to-create/select-object-to-create.component';
import { DashboardComponent } from './components/main/parts/dashboard/dashboard.component';
import { DevicesComponent } from './components/main/parts/devices/devices.component';
import { GroupOfObjectsComponent } from './components/main/parts/group-of-objects/group-of-objects.component';
import { RequestsComponent } from './components/main/parts/requests/requests.component';
import { UsersComponent } from './components/main/parts/users/users.component';
import { MyLoansComponent } from './components/main/personal/my-loans/my-loans.component';
import { ProfileComponent } from './components/main/personal/profile/profile.component';
import { RegisterCompletedComponent } from './components/register/register-completed/register-completed.component';
import { RegisterConfirmedComponent } from './components/register/register-confirmed/register-confirmed.component';
import { RegisterRecoverFinishComponent } from './components/register/register-recover-finish/register-recover-finish.component';
import { RegisterRecoverComponent } from './components/register/register-recover/register-recover.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: MainComponent, 
  children: [
    { path: 'dashboard', component: DashboardComponent },  
    { path: 'add-object', component: AddObjectComponent,
      children: [
        { path: 'select-type', component: SelectObjectToCreateComponent }    
      ]},
    { path: 'group-of-objects', component: GroupOfObjectsComponent },
    { path: 'requests', component: RequestsComponent },
    { path: 'users', component: UsersComponent },
    { path: 'devices', component: DevicesComponent },
    { path: 'add-data', component: AddDataComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'my-loans', component: MyLoansComponent },
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-completed', component: RegisterCompletedComponent},
  { path: 'register-confirmed', component: RegisterConfirmedComponent},
  { path: 'register-recover', component: RegisterRecoverComponent},
  { path: 'register-recover-finish', component: RegisterRecoverFinishComponent},
  { path: 'password-recovery', component: PasswordRecoveryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
