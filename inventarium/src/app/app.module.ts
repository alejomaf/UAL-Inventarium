import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterCompletedComponent } from './components/register/register-completed/register-completed.component';
import { RegisterConfirmedComponent } from './components/register/register-confirmed/register-confirmed.component';
import { RegisterRecoverComponent } from './components/register/register-recover/register-recover.component';
import { RegisterRecoverFinishComponent } from './components/register/register-recover-finish/register-recover-finish.component';
import { PasswordRecoveryComponent } from './components/login/password-recovery/password-recovery.component';
import { MainComponent } from './components/main/main.component';
import { VerticalNavbarComponent } from './components/main/vertical-navbar/vertical-navbar.component';
import { GroupOfObjectsComponent } from './components/main/parts/group-of-objects/group-of-objects.component';
import { ObjectsComponent } from './components/main/parts/group-of-objects/objects/objects.component';
import { AddObjectComponent } from './components/main/parts/add-object/add-object.component';
import { RequestsComponent } from './components/main/parts/requests/requests.component';
import { UsersComponent } from './components/main/parts/users/users.component';
import { UserComponent } from './components/main/parts/users/user/user.component';
import { AddDataComponent } from './components/main/admin/add-data/add-data.component';
import { ProfileComponent } from './components/main/personal/profile/profile.component';
import { MyLoansComponent } from './components/main/personal/my-loans/my-loans.component';
import { DashboardComponent } from './components/main/parts/dashboard/dashboard.component';
import { SelectObjectToCreateComponent } from './components/main/parts/add-object/select-object-to-create/select-object-to-create.component';
import { SelectOrCreateObjectComponent } from './components/main/parts/add-object/select-or-create-object/select-or-create-object.component';
import { AddDataToGroupOfObjectComponent } from './components/main/parts/add-object/add-data-to-group-of-object/add-data-to-group-of-object.component';
import { NumberAndLocationComponent } from './components/main/parts/add-object/object/number-and-location/number-and-location.component';
import { AddDataToObjectComponent } from './components/main/parts/add-object/object/add-data-to-object/add-data-to-object.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalObjectSelectComponent } from './components/main/parts/add-object/select-or-create-object/modal-object-select/modal-object-select.component';
import { GroupOfObjectComponent } from './components/main/parts/group-of-objects/group-of-object/group-of-object.component';
import { ObjectComponent } from './components/main/parts/group-of-objects/objects/object/object.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalLocationSelectComponent } from './components/main/parts/add-object/object/number-and-location/modal-location-select/modal-location-select.component';
import { ObjectUnitComponent } from './components/main/unit/object-unit/object-unit.component';
import { LoanComponent } from './components/main/parts/loans/loan/loan.component';
import { LoansComponent } from './components/main/parts/loans/loans.component';
import { UserRequestsComponent } from './components/main/parts/requests/user-requests/user-requests.component';
import { LoanRequestsComponent } from './components/main/parts/requests/loan-requests/loan-requests.component';
import { UserUnitComponent } from './components/main/unit/user-unit/user-unit.component';
import { PendingLoanComponent } from './components/main/parts/loans/loan/type/pending-loan/pending-loan.component';
import { DeclinedLoanComponent } from './components/main/parts/loans/loan/type/declined-loan/declined-loan.component';
import { CompletedLoanComponent } from './components/main/parts/loans/loan/type/completed-loan/completed-loan.component';
import { LoanUnitComponent } from './components/main/unit/loan-unit/loan-unit.component';
import { PendingLoansComponent } from './components/main/parts/requests/loan-requests/types/pending-loans/pending-loans.component';
import { ActiveLoansComponent } from './components/main/parts/requests/loan-requests/types/active-loans/active-loans.component';
import { ExpiredLoansComponent } from './components/main/parts/requests/loan-requests/types/expired-loans/expired-loans.component';
import { ConfigurationsComponent } from './components/main/parts/configurations/configurations.component';
import { ConfigurationComponent } from './components/main/parts/configurations/configuration/configuration.component';
import { GroupWithObjectsComponent } from './components/main/parts/group-of-objects/group-with-objects/group-with-objects.component';
import { KitsComponent } from './components/main/parts/group-of-objects/group-with-objects/kits/kits.component';
import { KitComponent } from './components/main/parts/group-of-objects/group-with-objects/kits/kit/kit.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterCompletedComponent,
    RegisterConfirmedComponent,
    RegisterRecoverComponent,
    RegisterRecoverFinishComponent,
    PasswordRecoveryComponent,
    MainComponent,
    VerticalNavbarComponent,
    GroupOfObjectsComponent,
    ObjectsComponent,
    AddObjectComponent,
    RequestsComponent,
    UsersComponent,
    UserComponent,
    AddDataComponent,
    ProfileComponent,
    MyLoansComponent,
    DashboardComponent,
    SelectObjectToCreateComponent,
    SelectOrCreateObjectComponent,
    AddDataToGroupOfObjectComponent,
    NumberAndLocationComponent,
    AddDataToObjectComponent,
    ModalObjectSelectComponent,
    GroupOfObjectComponent,
    ObjectComponent,
    ModalLocationSelectComponent,
    ObjectUnitComponent,
    LoanComponent,
    LoansComponent,
    UserRequestsComponent,
    LoanRequestsComponent,
    UserUnitComponent,
    PendingLoanComponent,
    DeclinedLoanComponent,
    CompletedLoanComponent,
    LoanUnitComponent,
    PendingLoansComponent,
    ActiveLoansComponent,
    ExpiredLoansComponent,
    ConfigurationsComponent,
    ConfigurationComponent,
    GroupWithObjectsComponent,
    KitsComponent,
    KitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
