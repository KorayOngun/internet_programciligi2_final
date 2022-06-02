import { Component, OnInit } from '@angular/core';
import { ServisService } from '../servis.service';
import { Sonuc } from '../models/Sonuc';
@Component({
  selector: 'app-tlbar',
  templateUrl: './tlbar.component.html',
  styleUrls: ['./tlbar.component.css'],
})
export class TlbarComponent implements OnInit {
  login:boolean=false
  kAdii!:string
  constructor(public servis: ServisService) {
    servis.oturumdogrulama().subscribe((data:Sonuc)=>{
      this.login = data.sonuc
      console.log(data)
      this.kAdii=localStorage.userName
    })
    servis.adminDogrulama().subscribe((data:Sonuc)=>{
      if (data.sonuc==true) {
        this.login=data.sonuc
        this.kAdii=localStorage.mail
      }
    })
  }

  ngOnInit(): void {}
  cikis(){
    localStorage.clear()
  }
}
