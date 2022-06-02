import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AdminUser } from '../models/AdminUser';
import { AdminView } from '../models/AdminView';
import { UserView } from '../models/UserView';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  displayedColumns: string[] = ['id', 'mail', 'name', 'ilanYetkisi'];
  displayedColumns2: string[] = ['id', 'mail','sil'];
  id=localStorage.id
  hide = true;
  UserList:UserView[]=[]
  AdminListe:AdminView[]=[]
  dataSource = new MatTableDataSource(this.UserList);
  dataSource2 = new MatTableDataSource(this.AdminListe);
  constructor(public srvs :ServisService) {
    this.users()
    this.admin()
  }

  ngOnInit(): void {
  }
  hesapOlustur(mail:string,sifre:string){
    var admin = new AdminView
    admin.adminId = localStorage.id
    admin.adminMail = localStorage.mail
    admin.adminToken = localStorage.tokenL
    admin.adminPassword = localStorage.sifre
    admin.newadminMail = mail,
    admin.newadminPassword = sifre
    this.srvs.adminEkle(admin).subscribe(response=>{
      alert(response.mesaj)
    })
  }
  users(){
    var admin = new AdminView
    admin.adminId = localStorage.id
    admin.adminMail = localStorage.mail
    admin.adminToken = localStorage.tokenL
    admin.adminPassword = localStorage.sifre
    this.srvs.userList(admin).subscribe(response=>{
      this.UserList = response
      this.dataSource = new MatTableDataSource(response);
      console.log(response)
    })
  }
  admin(){
    var admin = new AdminView
    admin.adminId = localStorage.id
    admin.adminMail = localStorage.mail
    admin.adminToken = localStorage.tokenL
    admin.adminPassword = localStorage.sifre
    this.srvs.adminlist(admin).subscribe(response=>{
      this.AdminListe = response
      this.dataSource2 = new MatTableDataSource(response);

    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterAdmin(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  adminsil(maill:string){
    var admin = new AdminView
    admin.adminId = localStorage.id
    admin.adminMail = localStorage.mail
    admin.adminToken = localStorage.tokenL
    admin.adminPassword = localStorage.sifre
    admin.newadminMail=maill
    console.log(admin)
    this.srvs.adminsil(admin).subscribe(response=>{
      alert(response.mesaj)
    })
  }
  kullaniciyetkiVerAl(id:string,islem:string){
    if (islem=="ver") {
      var admin = new AdminUser
    admin.adminId = localStorage.id
    admin.adminMail = localStorage.mail
    admin.adminToken = localStorage.tokenL
    admin.adminPassword = localStorage.sifre
    admin.userId=parseInt(id)
    admin.adminIslem="true"
    admin.adminMessge=""
    this.srvs.kullaniciyetkiVerAl(admin).subscribe(response=>{
      alert(response.mesaj)
    })
    }
    if (islem=="al") {
      var admin = new AdminUser
      admin.adminId = localStorage.id
      admin.adminMail = localStorage.mail
      admin.adminToken = localStorage.tokenL
      admin.adminPassword = localStorage.sifre
      admin.userId=parseInt(id)
      admin.adminIslem="false"
      admin.adminMessge="İlan yetkiniz geçici süreliğine askıya alınmıştır"
      this.srvs.kullaniciyetkiVerAl(admin).subscribe(response=>{
        alert(response.mesaj)
      })
    }

  }
}
