import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private authService: AuthService, private router: Router) { }

  onClickDisconnect() {
    if (confirm("Click ok to confirm")) {
      this.authService.logout();
      this.router.navigate([""]);
    }
  }



}
