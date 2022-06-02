import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ServisService } from "./servis.service";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public srvs:ServisService,
    public router :Router
  ){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    var yetki = route.data["yetki"]
    var gitUrl =route.data["gerigit"]

    if (localStorage.token==null || !yetki || !yetki.length) {
      this.router.navigate([gitUrl])
      return false;
    }
    var sonuc:boolean=false

    sonuc = this.srvs.yetkiKontrol(yetki)
    if (!sonuc) {
      window.location.href="/"
    }
    return sonuc
  }
}
