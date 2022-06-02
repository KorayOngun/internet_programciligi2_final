import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthGuard } from './AuthGuard';
import { CreateuserComponent } from './createuser/createuser.component';
import { HomeComponent } from './home/home.component';
import { IlanUpdateComponent } from './ilan-update/ilan-update.component';
import { IlanComponent } from './ilan/ilan.component';
import { IlangoruntulemeComponent } from './ilangoruntuleme/ilangoruntuleme.component';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { MesajsayfasiComponent } from './mesajsayfasi/mesajsayfasi.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { UserpageComponent } from './userpage/userpage.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createuser', component: CreateuserComponent },
  { path: 'loginuser', component: LoginuserComponent },
  { path: 'userpage', component: UserpageComponent,canActivate:[AuthGuard],data:{
    yetki:'uye',
    gerigit:"/"
  } },
  { path: 'message', component: MesajsayfasiComponent,canActivate:[AuthGuard],data:{
    yetki:'uye',
    gerigit:"/"
  } },
  { path: 'update/:id', component: IlanUpdateComponent,canActivate:[AuthGuard],data:{
    yetki:'uye',
    gerigit:"/"
  } },
  { path: 'ilangor/:id', component: IlangoruntulemeComponent },
  { path: 'newpage', component: IlanComponent,canActivate:[AuthGuard],data:{
    yetki:'uye',
    gerigit:"/"
  } },
  { path: 'newpassword', component: NewPasswordComponent},
  { path: 'adminlogin', component: AdminLoginComponent},
  { path: 'adminpage', component: AdminPageComponent,canActivate:[AuthGuard],data:{
    yetki:'admin',
    gerigit:"/"
  } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
