import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserView } from '../models/UserView';
import { ServisService } from '../servis.service';
@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  hide = true;
  constructor(
    public servis :ServisService
  ) { }

  ngOnInit(): void {
  }

  login(mail:string,sifre:string){
    var info = "username=uye½"+mail+"½"+sifre+"&grant_type=password"
    this.servis.userLogin(info).subscribe(response=>{
      if(response.sonuc=="true"){
        localStorage.setItem('token',response.access_token)
        localStorage.setItem('tokenL',response.tokenL)
        localStorage.setItem('id',response.uyeId)
        localStorage.setItem('mail',mail)
        localStorage.setItem('sifre',sifre)
        localStorage.setItem("userName",response.hesapAdi)
        localStorage.setItem("yetki",response.yetki)
        window.location.href="/userpage"
      }else{
        alert("hatalı mail adresi/şifre")
      }
    })
  }

  SifreUnuttum(mail:string){
    var u = new UserView()
    u.userMail=mail
    localStorage.setItem("mail",mail)
    this.servis.hesapKurtarma(u).subscribe(response=>{
    })
  }
}
