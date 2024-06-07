import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CaseListComponent } from './Components/Cases/case-list/case-list.component';
import { AuthInterceptor } from './Core/Authe/auth.interceptor';
import { CaseFormComponent } from './Components/Cases/case-form/case-form.component';
import { HearingListComponent } from './Components/Hearing/hearing-list/hearing-list.component';
import { HearingFormComponent } from './Components/Hearing/hearing-form/hearing-form.component';
import { LawyerListComponent } from './Components/lawyer-list/lawyer-list.component';
import { LawyerFormComponent } from './Components/Lawyes/lawyer-form/lawyer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CaseListComponent,
    CaseFormComponent,
    HearingListComponent,
    HearingFormComponent,
    LawyerListComponent,
    LawyerFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
  ],
  providers: [
    provideAnimations(),
    provideToastr(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
