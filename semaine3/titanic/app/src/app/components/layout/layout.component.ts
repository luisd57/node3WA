import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  isLoggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  onClickDisconnect() {
    this.isLoggedIn = false;
    alert("Click ok to confirm");
    this.auth.logout();
    this.router.navigate(["login"]);
  }



}
