import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-callbak',
  templateUrl: './auth-callbak.component.html',
  styleUrls: ['./auth-callbak.component.css']
})
export class AuthCallbakComponent implements OnInit {
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const user = JSON.parse(decodeURIComponent(params['user'] || '{}'));
      this.authService.setUser(user);
      this.router.navigate(['/passengers']);    });
  }
}
