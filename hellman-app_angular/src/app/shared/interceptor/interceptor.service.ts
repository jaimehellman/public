import { Injectable, NgModule } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
   
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
       ): Observable<HttpEvent<any>> {
           const cloneTsq = req.clone({
               // headers: req.headers.set('token', 'DCtbqRXC8L'),
           });
           return next.handle(cloneTsq);
       }

}