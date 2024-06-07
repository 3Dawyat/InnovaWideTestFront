import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { CaseListComponent } from './Components/Cases/case-list/case-list.component';
import { CaseFormComponent } from './Components/Cases/case-form/case-form.component';
import { authGuard } from './Core/Services/auth.guard';
import { HearingListComponent } from './Components/Hearing/hearing-list/hearing-list.component';
import { HearingFormComponent } from './Components/Hearing/hearing-form/hearing-form.component';
import { LawyerListComponent } from './Components/lawyer-list/lawyer-list.component';
import { LawyerFormComponent } from './Components/Lawyes/lawyer-form/lawyer-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cases', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cases', component: CaseListComponent, canActivate: [authGuard] },
  {
    path: 'cases/form/:id',
    component: CaseFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cases/form',
    component: CaseFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'hearings',
    component: HearingListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'hearings/form/:id',
    component: HearingFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'hearings/form',
    component: HearingFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'lawyers',
    component: LawyerListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'lawyers/form/:id',
    component: LawyerFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'lawyers/form',
    component: LawyerFormComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
