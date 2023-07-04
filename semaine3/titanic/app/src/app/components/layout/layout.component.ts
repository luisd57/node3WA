import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  isLoggedIn: boolean = false;
  currentUser!: User;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.auth.getUser();
    this.isLoggedIn = !!this.currentUser;
  }

  onClickDisconnect() {
    this.isLoggedIn = false;
    alert("Click ok to confirm");
    this.auth.logout();
    this.router.navigate(["login"]);
  }





}
