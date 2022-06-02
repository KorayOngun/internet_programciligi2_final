import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserView } from './models/UserView';
import { Sonuc } from './models/Sonuc';
import { Token } from './models/Token';
import { IlanView } from './models/ilanView';
import { IlanKayitView } from './models/IlanKayitView';
import { FotoModel } from './models/fotoModel';
import { User } from './models/User';
import { MesajView } from './models/MesajView';
import { YeniSifre } from './models/YeniSifre';
import { AdminView } from './models/AdminView';
import { AdminUser } from './models/AdminUser';
@Injectable({
  providedIn: 'root'
})
export class ServisService {
  apiUrl = "https://localhost:44399/api/"
  dosyaUrl="https://localhost:44399/Fotolar/"
  constructor(public http : HttpClient) {


   }
   userLogin(info:string){
    return this.http.post<Token>(this.apiUrl+"token",info)
   }
   yeniKayit(user:UserView){
     return this.http.post<Sonuc>(this.apiUrl+"yenikayit",user)
  }
  yetkiKontrol(yetki:string){
    var sonuc:boolean=false

    var Uyeyetki = localStorage.yetki;

    if (Uyeyetki) {
      if (Uyeyetki=yetki) {
        sonuc=true
      }
    }
    return sonuc
  }
  oturumdogrulama(): any{
    var hesap = new UserView()
    hesap.userMail=localStorage.getItem('mail')
    hesap.token = localStorage.getItem('tokenL')
    hesap.userPassword = localStorage.getItem('sifre')
    return this.http.post<Sonuc>(this.apiUrl+"userdogrulama",hesap)
  }
  anaSayfa(){
    return this.http.get<IlanView[]>(this.apiUrl+"anasayfa")
  }
  ilanGorutuleme(id:string){
    return this.http.get<IlanView>(this.apiUrl+"ilankayitbyid/"+id)
  }
  yeniIlan(ilan:IlanKayitView){
    return this.http.post<Sonuc>(this.apiUrl+"ilanyeni",ilan)
  }
  fotoEkle(foto:FotoModel){
    return this.http.post<FotoModel>(this.apiUrl+"fotoekle",foto)
  }
  ilanDuzenle(ilan:IlanKayitView){
    return this.http.post<Sonuc>(this.apiUrl+"ilanduzenle",ilan)
  }
  ilanbyid(id:string){
    return this.http.get<IlanView>(this.apiUrl+"ilankayitbyid/"+id)
  }
  ilanbyuserid(us:User){
    return this.http.post<IlanView[]>(this.apiUrl+"ilankayitbyuserid",us)
  }
  ilansil(ilan:IlanKayitView){
    return this.http.post<Sonuc>(this.apiUrl+"ilansil",ilan)
  }
  mesajgonder(m:MesajView){
    return this.http.post<Sonuc>(this.apiUrl+"mesajgonder",m)
  }
  sohbetGetir(m:MesajView){
    return this.http.post<MesajView[]>(this.apiUrl+"sohbetgoruntule",m)
  }
  mesajGetir(u:User){
    return this.http.post<MesajView[]>(this.apiUrl+"mesajcek",u)
  }
  hesapKurtarma(u:UserView){
    return this.http.post(this.apiUrl+"hesapkurtarma",u)
  }
  sifreSifirla(sifre:YeniSifre){
    return this.http.post<Sonuc>(this.apiUrl+"sifresifirla",sifre)
  }
  adminDogrulama(){
    var hesap = new AdminView()
    hesap.adminMail=localStorage.getItem('mail')
    hesap.adminToken = localStorage.getItem('tokenL')
    hesap.adminPassword = localStorage.getItem('sifre')
    return this.http.post<Sonuc>(this.apiUrl+"AdminDogrulama",hesap)
  }
  userList(a:AdminView){
    return this.http.post<UserView[]>(this.apiUrl+"uyeliste",a)
  }
  adminlist(a:AdminView){
    return this.http.post<AdminView[]>(this.apiUrl+"adminliste",a)
  }
  adminEkle(a:AdminView){
    return this.http.post<Sonuc>(this.apiUrl+"adminekle",a)
  }
  adminsil(a:AdminView){ //sadece 1. admin  yeni admin hesapları yetkinlendirebilir/hesap silebilir
    return this.http.post<Sonuc>(this.apiUrl+"adminsil",a)
  }
  kullaniciyetkiVerAl(a:AdminUser){
    return this.http.post<Sonuc>(this.apiUrl+"adminmesajkullanıcı",a)
  }
}
