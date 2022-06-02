import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IlanView } from '../models/ilanView';
import { MesajView } from '../models/MesajView';
import { Sonuc } from '../models/Sonuc';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-ilangoruntuleme',
  templateUrl: './ilangoruntuleme.component.html',
  styleUrls: ['./ilangoruntuleme.component.css']
})
export class IlangoruntulemeComponent implements OnInit {
  id!:string
  fotolar!:string[]
  Ilan!:IlanView
  seciliFoto!:string
  ozellikler!:string[]
  muhit!:string[]
  isLogin:boolean = false
  constructor(private route :ActivatedRoute,
              public srvs : ServisService) {
    this.id = this.route.snapshot.params.id;
    srvs.oturumdogrulama().subscribe((data:Sonuc)=>{
      this.isLogin = data.sonuc

    })
    this.ilan()
   }

  ngOnInit(): void {
  }
  ilan(){
    this.srvs.ilanGorutuleme(this.id).subscribe(response=>{
      this.fotolar=response.resimler.split(",")
      this.seciliFoto=this.fotolar[0]
      this.ozellikler = response.ozellikler.split(',')
      this.muhit = response.muhit.split(',')
      this.Ilan = response
      console.log(response.user)
      this.fotolar.pop()
    })
  }
  resimDegistir(imgg:string){
    this.seciliFoto = imgg
  }
  mesajGonder(){
    var fm = new MesajView()
    fm.gonderen = localStorage.userName
    fm.alan =  this.Ilan.user
    fm.mesaj="merhaba"
    this.srvs.mesajgonder(fm).subscribe(response=>{
      if (response.sonuc==true) {
        window.location.href="/message"
      }
    })
  }

}
