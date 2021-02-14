import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    auth.getUser().subscribe(
      (user) => {
        this.email = user?.email;
      }
    );
  }

  ngOnInit(): void {
  }

  async handleSignOut(): Promise<any> {
    try {
      const res = await this.auth.signOut();
      this.router.navigateByUrl('/signin');
      this.toastr.warning('login again to countinue');
      this.email = null;
    } catch (error) {
      this.toastr.error('something is wrong');
    }
  }

}
