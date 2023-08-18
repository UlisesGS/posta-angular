import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    
  constructor(private authService : AuthService,private router: Router){ }


  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      
    return next.handle(req).pipe(
      catchError(e =>{
        if (e.status == 401) {

          if(this.authService.isLogin){
            this.authService.logaut();
          }
          this.router.navigate(['/login']);
        }
        if(e.status == 403){
          
          
          Swal.fire('Acceso denegado',`Hola ${this.authService.nameUsuario()} no tienes acceso`,'error')
          this.router.navigate(['/main']);
        }
        return throwError(e);
      })
    );
  }
}