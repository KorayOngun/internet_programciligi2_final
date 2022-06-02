import { Component, OnInit } from '@angular/core';
import { MesajView } from '../models/MesajView';
import { User } from '../models/User';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-mesajsayfasi',
  templateUrl: './mesajsayfasi.component.html',
  styleUrls: ['./mesajsayfasi.component.css'],
})
export class MesajsayfasiComponent implements OnInit {
  gonderenler: MesajView[] = [];
  isimler: string[] = [];
  mesajlar: MesajView[] = [];
  name: string = localStorage.userName;
  alan:string=""
  constructor(public srvs: ServisService) {
    this.mesajgetir();

    setInterval(()=>{
      if (this.alan!="") {
        this.sohbetGetir(this.alan)
      }
    },5000)
  }

  ngOnInit(): void {}
  mesajgetir() {
    var us = new User();
    us.userName = localStorage.userName;
    this.srvs.mesajGetir(us).subscribe((response) => {
      this.gonderenler = response;
      for (let index = 0; index < this.gonderenler.length; index++) {
        if (this.gonderenler[index].alan != localStorage.userName) {
          if (this.isimler.indexOf(this.gonderenler[index].alan) == -1) {
            this.isimler.push(this.gonderenler[index].alan);
          }
        } else {
          if (this.isimler.indexOf(this.gonderenler[index].gonderen) == -1) {
            this.isimler.push(this.gonderenler[index].gonderen);
          }
        }
      }
    });
  }
  sohbetGetir(m: string) {
    var sohbet = new MesajView();
    sohbet.alan = localStorage.userName;
    sohbet.gonderen = m;
    this.alan = m
      this.srvs.sohbetGetir(sohbet).subscribe((response) => {
      this.mesajlar = response;
    });
  }
  gonder(mesaj:string){
    var m = new MesajView()
    m.gonderen = this.name
    m.alan = this.alan
    m.mesaj = mesaj
    this.srvs.mesajgonder(m).subscribe(response=>{
    })
  }
}
