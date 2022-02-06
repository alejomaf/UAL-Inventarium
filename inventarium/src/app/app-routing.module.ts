import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddDataComponent } from './components/main/admin/add-data/add-data.component';
import { MainComponent } from './components/main/main.component';
import { AddDataToGroupOfObjectComponent } from './components/main/parts/add-object/add-data-to-group-of-object/add-data-to-group-of-object.component';
import { AddObjectComponent } from './components/main/parts/add-object/add-object.component';
import { AddDataToObjectComponent } from './components/main/parts/add-object/object/add-data-to-object/add-data-to-object.component';
import { NumberAndLocationComponent } from './components/main/parts/add-object/object/number-and-location/number-and-location.component';
import { SelectObjectToCreateComponent } from './components/main/parts/add-object/select-object-to-create/select-object-to-create.component';
import { SelectOrCreateObjectComponent } from './components/main/parts/add-object/select-or-create-object/select-or-create-object.component';
import { ConfigurationsComponent } from './components/main/parts/configurations/configurations.component';
import { DashboardComponent } from './components/main/parts/dashboard/dashboard.component';
import { GroupOfObjectsComponent } from './components/main/parts/group-of-objects/group-of-objects.component';
import { GroupWithObjectsComponent } from './components/main/parts/group-of-objects/group-with-objects/group-with-objects.component';
import { KitsComponent } from './components/main/parts/group-of-objects/group-with-objects/kits/kits.component';
import { ObjectSearchComponent } from './components/main/parts/group-of-objects/objects/object-search/object-search.component';
import { ObjectComponent } from './components/main/parts/group-of-objects/objects/object/object.component';
import { ObjectsComponent } from './components/main/parts/group-of-objects/objects/objects.component';
import { LoansComponent } from './components/main/parts/loans/loans.component';
import { LoanRequestsComponent } from './components/main/parts/requests/loan-requests/loan-requests.component';
import { ActiveLoansComponent } from './components/main/parts/requests/loan-requests/types/active-loans/active-loans.component';
import { ExpiredLoansComponent } from './components/main/parts/requests/loan-requests/types/expired-loans/expired-loans.component';
import { PendingLoansComponent } from './components/main/parts/requests/loan-requests/types/pending-loans/pending-loans.component';
import { RequestsComponent } from './components/main/parts/requests/requests.component';
import { UserRequestsComponent } from './components/main/parts/requests/user-requests/user-requests.component';
import { UsersComponent } from './components/main/parts/users/users.component';
import { MyLoansComponent } from './components/main/personal/my-loans/my-loans.component';
import { ProfileComponent } from './components/main/personal/profile/profile.component';
import { LoanUnitComponent } from './components/main/unit/loan-unit/loan-unit.component';
import { ObjectUnitComponent } from './components/main/unit/object-unit/object-unit.component';
import { UserUnitComponent } from './components/main/unit/user-unit/user-unit.component';
import { RecoverPasswordComponent } from './components/register/recover-password/recover-password.component';
import { ResetPasswordComponent } from './components/register/recover-password/reset-password/reset-password.component';
import { RegisterCompletedComponent } from './components/register/register-completed/register-completed.component';
import { RegisterConfirmedComponent } from './components/register/register-confirmed/register-confirmed.component';
import { RegisterRecoverFinishComponent } from './components/register/register-recover-finish/register-recover-finish.component';
import { RegisterRecoverComponent } from './components/register/register-recover/register-recover.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'add-object', component: AddObjectComponent,
        children: [
          { path: 'select-type', component: SelectObjectToCreateComponent },
          { path: ':id', component: SelectOrCreateObjectComponent },
          { path: 'create/:id', component: NumberAndLocationComponent },
          { path: 'create_new_group_of_objects/:type/:name', component: AddDataToGroupOfObjectComponent },
          { path: 'create/:group_of_object_id/:location_id/:quantity', component: AddDataToObjectComponent },
        ]
      },
      { path: 'group-of-objects', component: GroupOfObjectsComponent },
      {
        path: 'group-of-object/:id', component: GroupWithObjectsComponent, children: [
          { path: '', component: ObjectsComponent },
          { path: 'kits', component: KitsComponent },
        ]
      },
      { path: 'object-search', component: ObjectSearchComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'user-requests', component: UserRequestsComponent },
      { path: 'loan-requests', component: LoanRequestsComponent },
      { path: 'loan-requests/active-loans', component: ActiveLoansComponent },
      { path: 'loan-requests/pending-loans', component: PendingLoansComponent },
      { path: 'loan-requests/expired-loans', component: ExpiredLoansComponent },
      { path: 'users', component: UsersComponent },
      { path: 'configurations', component: ConfigurationsComponent },
      { path: 'add-data', component: AddDataComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'my-loans', component: MyLoansComponent },
      { path: 'loans/:id', component: LoansComponent },
      { path: 'loans/user/:id', component: MyLoansComponent },
      { path: 'object/:id', component: ObjectUnitComponent },
      { path: 'user/:id', component: UserUnitComponent },
      { path: 'loan/:id', component: LoanUnitComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-completed', component: RegisterCompletedComponent },
  { path: 'register-confirmed/:id/:number/:token', component: RegisterConfirmedComponent },
  { path: 'register-recover', component: RegisterRecoverComponent },
  { path: 'register-recover-finish', component: RegisterRecoverFinishComponent },
  { path: 'password-recovery', component: RecoverPasswordComponent },
  { path: 'password-new-set/:hash', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
