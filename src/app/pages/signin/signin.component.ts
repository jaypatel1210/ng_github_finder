import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(f: NgForm) {
    const { email, password } = f.form.value;
    // TODO: do your checking here
    this.auth
      .signIn(email, password)
      .then((res) => {
        this.router.navigateByUrl('/');
        this.toastr.success('Signup Success');
      })
      .catch((err) => {
        console.log(err.message);
        this.toastr.error('Singup failed');
      });
  }

  copyText(text): void {
    navigator.clipboard.writeText(text)
    .then(
      () => {
        this.toastr.success('Copied');
      }
    )
    .catch(
      () => {
        this.toastr.error('Something Went Wrong');
      }
    );
  }

}
