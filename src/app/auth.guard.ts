import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './shared/http.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService
  ) { }

  canActivate(): boolean {
    if (this.httpService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['auth'], { relativeTo: this.route });
      return false;
    }
  }

}
