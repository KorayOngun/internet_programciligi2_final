import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FotoModel } from '../models/fotoModel';
import { IlanKayitView } from '../models/IlanKayitView';
import { IlanView } from '../models/ilanView';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-ilan-update',
  templateUrl: './ilan-update.component.html',
  styleUrls: ['./ilan-update.component.css']
})
export class IlanUpdateComponent implements OnInit {
  ozellik: string[] = [
    'fiber altyapısı',
    'havuz',
    'alarm (yangın)',
    'adsl',
    'kamera sistemi',
    'Duşakabin',
    'Alarm (Hırsız)',
    'Isıcam',
    'Amerikan Mutfak',
    'Çamaşır Makinesi',
    'Ankastre Fırın',
    'Parke Zemin',
    'Seramik Zemin',
    'Bulaşık Makinesi',
    'Jakuzi',
    'Küvet',
    'Laminat Zemin',
    'Mobilya',
    'Panjur',
    'Teras',
    'Şofben',
    'Fırın',
    'Yüz Tanıma & Parmak İzi',
    'Müstakil Havuzlu',
    'Yangın Merdiveni',
    'Sauna',
    'Hamam',
    'Güvenlik',
  ];
  muhit: string[] = [
    'Alışveriş Merkezi',
    'Belediye',
    'Denize Sıfır',
    'Eczane',
    'Hastane',
    'Eğlence Merkezi',
    'Fuar',
    'Polis Merkezi',
    'Sağlık Ocağı',
    'Semt Pazarı',
    'Spor Salonu',
    'Şehir Merkezi',
    'Üniversite',
  ];
id:string
  ozellikler:string[]=[]
  muhits:string[]=[]
  tur:string=""
  fotolar:string[]=[]
  link:string=""
  secilenFoto!:any
  fm:FotoModel=new FotoModel();
  fmlist:FotoModel[]=[];
  Ilan:IlanView = new IlanView();
  constructor(public srvs : ServisService, private route :ActivatedRoute) {
    this.id = this.route.snapshot.params.id;

   }

  ngOnInit(): void {
    this.srvs.ilanbyid(this.id).subscribe(data=>{
      setTimeout(() => {
        this.muhits=data.muhit.split(',')
        this.ozellikler=data.ozellikler.split(',')
        this.muhits=data.muhit.split(',')
        this.fotolar = data.resimler.split(',')
        this.fotolar.pop()
        console.log(this.fotolar)
        this.Ilan = data
      }, 1500);
    })
  }
  ekle(ozl:string){
    var index = this.ozellikler.indexOf(ozl)
    if(index==-1){
      this.ozellikler.push(ozl)
    }else{
      this.ozellikler.splice(index,1)
    }

  }
  ekleMuhits(ozl:string){
    var index = this.muhits.indexOf(ozl)
    if(index==-1){
      this.muhits.push(ozl)
    }else{
      this.muhits.splice(index,1)
    }
  }
  kaydet(baslik:string,aciklama:string,metrekare:string,fiyat:string,sk:string,oda:string,ktsayi:string,bulundugukat:string,kredi:string,esya:string){
    var ilan = new IlanKayitView()
    ilan.baslik = baslik
    ilan.aciklama = aciklama
    ilan.metrekare = metrekare
    ilan.fiyat =fiyat
    ilan.durum = sk
    ilan.ilanTipi = this.tur
    ilan.kat = oda
    ilan.katsayisi = ktsayi
    ilan.bulundugukat = bulundugukat
    ilan.kredi = kredi
    ilan.esya=esya
    ilan.userId = localStorage.getItem("id")
    ilan.token = localStorage.getItem("tokenL")
    ilan.userMail = localStorage.getItem("mail")
    ilan.userPassword =localStorage.getItem("sifre")
    ilan.ozellikler = this.ozellikler.toString()
    ilan.muhit = this.muhits.toString()
    ilan.ilanId = parseInt(this.id)
    this.srvs.ilanDuzenle(ilan).subscribe(response=>{
      alert(response.mesaj)
    })
  }
}
