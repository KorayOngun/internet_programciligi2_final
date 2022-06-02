import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { YeniSifre } from '../models/YeniSifre';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  hide = true;
  constructor(
    public srvs :ServisService
  ) { }

  ngOnInit(): void {
  }
  Degistir(kod:string,yenisifre:string){
   var s = new YeniSifre()
   s.mail = localStorage.mail
   s.dogrulama = kod
   s.yenisifre = yenisifre
    this.srvs.sifreSifirla(s).subscribe(response=>{
      if (response.sonuc==true) {
        window.location.href="/"
      }
    })
  }
}
