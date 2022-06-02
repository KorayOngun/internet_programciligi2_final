import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserView } from '../models/UserView';
import { ServisService } from '../servis.service';
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
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
  hesapOlustur(name:string,mail:string,parola:string){
    var hesap = new UserView()
    hesap.userName=name
    hesap.userMail = mail
    hesap.userPassword = parola
    this.servis.yeniKayit(hesap).subscribe(data=>{
      console.log(data.sonuc)
      if (data.sonuc==true) {
        window.location.href="/loginuser"
      }
    })
  }

}
