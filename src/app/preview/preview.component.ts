import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IlanView } from '../models/ilanView';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  Ilan:IlanView=new IlanView()
  ozellikler!:string[]
  muhit!:string[]
  seciliFoto!:string
  fotolar!:string[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string},public srvs : ServisService) {
    setTimeout(()=>{
      this.ilan()
    },2000)
   }

  ngOnInit(): void {
    this.ilan()
  }
  resimDegistir(imgg:string){
    this.seciliFoto = imgg
  }
  ilan(){
    this.srvs.ilanGorutuleme(this.data.id).subscribe(response=>{
      this.fotolar=response.resimler.split(",")
      this.seciliFoto=this.fotolar[0]
      this.ozellikler = response.ozellikler.split(',')
      this.muhit = response.muhit.split(',')
      this.Ilan = response
      console.log(response)
      this.fotolar.pop()
      console.log(this.data.id)
    })
}
}
