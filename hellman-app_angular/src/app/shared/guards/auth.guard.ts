import { Injectable } from '@angular/core';
import { CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/core/auto.service';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) : Observable<boolean> | boolean {
     
        return this.verificarAcesso();
    }

    canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
 
        return this.verificarAcesso();
    }


    private verificarAcesso()
    {
        if (this.authService.getAuthenticated()){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

   
}