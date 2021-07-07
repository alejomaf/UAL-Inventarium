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
import { DevicesComponent } from './components/main/parts/devices/devices.component';
import { DeviceComponent } from './components/main/parts/devices/device/device.component';
import { AddDataComponent } from './components/main/admin/add-data/add-data.component';
import { ProfileComponent } from './components/main/personal/profile/profile.component';
import { MyLoansComponent } from './components/main/personal/my-loans/my-loans.component';
import { DashboardComponent } from './components/main/parts/dashboard/dashboard.component';
import { SelectObjectToCreateComponent } from './components/main/parts/add-object/select-object-to-create/select-object-to-create.component';
import { SelectOrCreateObjectComponent } from './components/main/parts/add-object/select-or-create-object/select-or-create-object.component';
import { AddDataToGroupOfObjectComponent } from './components/main/parts/add-object/add-data-to-group-of-object/add-data-to-group-of-object.component';
import { NumberAndLocationComponent } from './components/main/parts/add-object/object/number-and-location/number-and-location.component';
import { AddDataToObjectComponent } from './components/main/parts/add-object/object/add-data-to-object/add-data-to-object.component';

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
    DevicesComponent,
    DeviceComponent,
    AddDataComponent,
    ProfileComponent,
    MyLoansComponent,
    DashboardComponent,
    SelectObjectToCreateComponent,
    SelectOrCreateObjectComponent,
    AddDataToGroupOfObjectComponent,
    NumberAndLocationComponent,
    AddDataToObjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
