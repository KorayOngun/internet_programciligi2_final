import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IlanView } from '../models/ilanView';
import { User } from '../models/User';
import { PreviewComponent } from '../preview/preview.component';
import { ServisService } from '../servis.service';
import { SilbodyComponent } from '../silbody/silbody.component';
@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css'],
})
export class UserpageComponent implements OnInit {
  displayedColumns: string[] = [
    'img',
    'baslik',
    'aciklama',
    'fiyat',
    'onizleme',
    'duzenle',
    'sil',
  ];
  veriler: IlanView[] = [];
  dataSource = new MatTableDataSource<IlanView>(this.veriler);
  msj:string=""
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  openDialog(id:string) {
    const dialogRef = this.dialog.open(SilbodyComponent, {
      data: { name: id.toString() },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openPreview(i:string) {
    const dialogRef = this.dialog.open(PreviewComponent, {
      data: { id: i},
      width:"90%",
      height:"95%"
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  constructor(public dialog: MatDialog, public srvs: ServisService) {
    var u = new User();
    u.userId =localStorage.id;
    u.token = localStorage.tokenL;
    u.userMail = localStorage.mail;
    u.userPassword = localStorage.sifre;
    srvs.ilanbyuserid(u).subscribe((response: IlanView[]) => {
      this.veriler = response;
      for (let index = 0; index < response.length; index++) {
        try {
          this.veriler[index].resimler = this.veriler[index].resimler.split(',')[0]
        } catch (error) {
        }
      }
      console.log(response);
      this.dataSource = new MatTableDataSource<IlanView>(this.veriler);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {}
}
