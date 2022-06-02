import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IlanKayitView } from '../models/IlanKayitView';
import { ServisService } from '../servis.service';
@Component({
  selector: 'app-silbody',
  templateUrl: './silbody.component.html',
  styleUrls: ['./silbody.component.css']
})
export class SilbodyComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: {name: string},public srvs : ServisService) { }

  ngOnInit(): void {
    console.log(this.data.name.toString())
  }
  sil(){
      var i = new IlanKayitView()
      i.userId = localStorage.id
      i.userMail = localStorage.mail
      i.userPassword = localStorage.sifre
      i.token = localStorage.tokenL
      i.ilanId = parseInt(this.data.name)
      this.srvs.ilansil(i).subscribe(response=>{
        alert(response.mesaj)
      })
      window.location.href="/userpage"
  }
}
