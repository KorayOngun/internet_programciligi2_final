import { Component, OnInit } from '@angular/core';
import { FotoModel } from '../models/fotoModel';
import { IlanKayitView } from '../models/IlanKayitView';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-ilan',
  templateUrl: './ilan.component.html',
  styleUrls: ['./ilan.component.css'],
})
export class IlanComponent implements OnInit {
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
  cphe:string[]=['kuzey','güney','doğu','batı']
  ozellikler:string[]=[]
  muhits:string[]=[]
  cephe:string[]=[]
  tur:string=""
  fotolar:string[]=[]
  link:string=""
  secilenFoto!:any
  fm:FotoModel=new FotoModel();
  fmlist:FotoModel[]=[];
  sehirler = [
    'Adana',
    'Adıyaman',
    'Afyon',
    'Ağrı',
    'Amasya',
    'Ankara',
    'Antalya',
    'Artvin',
    'Aydın',
    'Balıkesir',
    'Bilecik',
    'Bingöl',
    'Bitlis',
    'Bolu',
    'Burdur',
    'Bursa',
    'Çanakkale',
    'Çankırı',
    'Çorum',
    'Denizli',
    'Diyarbakır',
    'Edirne',
    'Elazığ',
    'Erzincan',
    'Erzurum',
    'Eskişehir',
    'Gaziantep',
    'Giresun',
    'Gümüşhane',
    'Hakkari',
    'Hatay',
    'Isparta',
    'İçel (Mersin)',
    'İstanbul',
    'İzmir',
    'Kars',
    'Kastamonu',
    'Kayseri',
    'Kırklareli',
    'Kırşehir',
    'Kocaeli',
    'Konya',
    'Kütahya',
    'Malatya',
    'Manisa',
    'Kahramanmaraş',
    'Mardin',
    'Muğla',
    'Muş',
    'Nevşehir',
    'Niğde',
    'Ordu',
    'Rize',
    'Sakarya',
    'Samsun',
    'Siirt',
    'Sinop',
    'Sivas',
    'Tekirdağ',
    'Tokat',
    'Trabzon',
    'Tunceli',
    'Şanlıurfa',
    'Uşak',
    'Van',
    'Yozgat',
    'Zonguldak',
    'Aksaray',
    'Bayburt',
    'Karaman',
    'Kırıkkale',
    'Batman',
    'Şırnak',
    'Bartın',
    'Ardahan',
    'Iğdır',
    'Yalova',
    'Karabük',
    'Kilis',
    'Osmaniye',
    'Düzce',
  ];
  sayac:number=0
  constructor(
    public srvs : ServisService

  ) {}
    ngOnInit(): void {}
  FotoSec(e:any){
    var fotolar = e.target.files;
    var foto = fotolar[0];
    var fr = new FileReader();
    fr.onloadend=()=>{
      this.secilenFoto=fr.result;
      this.fm.data=fr.result?.toString()
      this.fm.uzanti=foto.type;
    }
    fr.readAsDataURL(foto);
  }

  fotoekle(){
    this.fmlist.push(this.fm)
    this.fm = new FotoModel()
    this.sayac = this.sayac+1
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
  cepheEkleSil(yon:string){
    var snc = this.cephe.indexOf(yon)
    if (snc==1) {
      this.cephe.push(yon)
    }else{
      this.cephe.splice(snc,1)
    }
  }

  kaydet(baslik:string,aciklama:string,metrekare:string,fiyat:string,sk:string,oda:string,ktsayi:string,bulundugukat:string,kredi:string,esya:string,sehir:string){
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
    ilan.sehir= sehir
    ilan.cepheler = this.cephe.toString()
    ilan.userId = localStorage.getItem("id")
    ilan.token = localStorage.getItem("tokenL")
    ilan.userMail = localStorage.getItem("mail")
    ilan.userPassword =localStorage.getItem("sifre")
    ilan.ozellikler = this.ozellikler.toString()
    ilan.muhit = this.muhits.toString()
    ilan.user = localStorage.getItem("userName")
    var rsim=""
    for (let index = 0; index < this.fmlist.length; index++) {
      rsim =rsim+localStorage.getItem("id")+"_"+baslik+"_"+index.toString()+this.fmlist[index].uzanti?.replace("image/", ".")+","

    }
    console.log(ilan)
    ilan.resimler = rsim
    this.srvs.yeniIlan(ilan).subscribe(response=>{
      alert(response.mesaj)
      if (response.sonuc==true) {
        for (let index = 0; index < this.fmlist.length; index++) {
         setTimeout(() => {
          this.fmlist[index].ilanId=localStorage.getItem("id")
          this.fmlist[index].sira="_"+baslik+"_"+index.toString()
          this.srvs.fotoEkle(this.fmlist[index]).subscribe(response=>{
            console.log(response)
          })
         }, 1500);

        }
      }
    })
  }
}
