import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeModel } from '../models/homeModel';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IlanView } from '../models/ilanView';
import { ServisService } from '../servis.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  typesOfShoes: string[] = ['satılık', 'kiralık'];
  displayedColumns: string[] = ['img', 'baslik', 'aciklama', 'fiyat', 'ilan'];
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
  veriler: IlanView[] = [
  ];
  dataSource!:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public srvs : ServisService) {
    this.anasayfa()
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<IlanView>(this.veriler);
      this.dataSource.paginator = this.paginator;
    }, 500);

  }
  ngOnInit(): void {}

  anasayfa(){
    this.srvs.anaSayfa().subscribe((data:IlanView[])=>{
      this.veriler=data.reverse()
      for (let index = 0; index < this.veriler.length; index++) {
        this.veriler[index].resimler=data[index].resimler.split(',')[0]
       }
    })

  }
  filtrele(sehir:string,min:string,max:string){
    this.veriler = this.veriler.filter(x=>x.sehir==sehir && parseInt(x.fiyat)>parseInt(min) && parseInt(x.fiyat)<parseInt(max))
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<IlanView>(this.veriler);
      this.dataSource.paginator = this.paginator;
    }, 500);
  }
  temizle(){
    this.anasayfa()
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<IlanView>(this.veriler);
      this.dataSource.paginator = this.paginator;
    }, 500);
  }
}
