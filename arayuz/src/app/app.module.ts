import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { TlbarComponent } from './tlbar/tlbar.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { CreateuserComponent } from './createuser/createuser.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserpageComponent } from './userpage/userpage.component';
import { MesajsayfasiComponent } from './mesajsayfasi/mesajsayfasi.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SilbodyComponent } from './silbody/silbody.component';
import { IlanComponent } from './ilan/ilan.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import { IlangoruntulemeComponent } from './ilangoruntuleme/ilangoruntuleme.component';
import {MatChipsModule} from '@angular/material/chips';
import { IlanUpdateComponent } from './ilan-update/ilan-update.component';
import { PreviewComponent } from './preview/preview.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthInterceptor } from './AuthInterceptor';
import { AuthGuard } from './AuthGuard';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TlbarComponent,
    CreateuserComponent,
    LoginuserComponent,
    UserpageComponent,
    MesajsayfasiComponent,
    SilbodyComponent,
    IlanComponent,
    IlangoruntulemeComponent,
    IlanUpdateComponent,
    PreviewComponent,
    NewPasswordComponent,
    AdminPageComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatRadioModule,
    MatStepperModule,
    MatChipsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
