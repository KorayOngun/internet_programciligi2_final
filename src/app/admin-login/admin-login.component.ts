import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserView } from '../models/UserView';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  hide = true;
  constructor(public servis :ServisService) { }

  ngOnInit(): void {
  }
  login(mail:string,sifre:string){
    var info = "username=admin½"+mail+"½"+sifre+"&grant_type=password"
    this.servis.userLogin(info).subscribe(response=>{
      console.log(response)
      if(response.sonuc=="true"){
        localStorage.setItem('token',response.access_token)
        localStorage.setItem('tokenL',response.tokenL)
        localStorage.setItem('id',response.uyeId)
        localStorage.setItem('mail',mail)
        localStorage.setItem('sifre',sifre)
        localStorage.setItem("userName",response.hesapAdi)
        localStorage.setItem("yetki",response.yetki)
        window.location.href="/adminpage"

      }else{
        alert("hatalı mail adresi/şifre")
      }
    })
  }
  oturumDogrulama(){
    this.servis.adminDogrulama().subscribe(response=>{
      if (response.sonuc==true) {

      }else{
        localStorage.clear()
        window.location.href = "/"
      }
    })
  }
}
