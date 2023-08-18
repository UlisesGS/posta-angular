import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService,
    private router:Router
   ){

    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLogin()){
      if(this.isTokenExpired()){
        this.authService.logaut();
        this.router.navigate(['/login'])
        return false;
      }
      return true;
    }
    this.router.navigate(['login'])
      return false;
  }

  isTokenExpired(): boolean{
    let token = this.authService.token;
    let payload = JSON.parse(atob(token.split(".")[1]));
    let now = new Date().getTime() / 1000;
    if(payload.exp<now){
      return true;
    }
    return false;
  }
  
}
