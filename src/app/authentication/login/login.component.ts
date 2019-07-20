import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    if (this.httpService.loggedIn) {
      this.router.navigate(['../../employee'], { relativeTo: this.route });
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get pass() {
    return this.loginForm.get('pass');
  }

  loginUser() {
    const data = new FormData();

    data.append('email', this.email.value);
    data.append('pass', this.pass.value);

    this.httpService.loginUser(data).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['../../dashboard'], { relativeTo: this.route });
      this.toastr.success('Success', 'Login successfully');
    },
      err => {
        this.toastr.error('', err.error.message, {
          timeOut: 850
        });
      }
    );
  }
}
