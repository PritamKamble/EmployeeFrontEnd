import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      confirmPass: ['test', [Validators.required]]
    });
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get pass() {
    return this.registrationForm.get('pass');
  }

  registerUser() {
    const data = new FormData();

    data.append('email', this.email.value);
    data.append('pass', this.pass.value);

    this.httpService.registerUser(data).subscribe(response => {
      // this.router.navigate(['../../employee'], { relativeTo: this.route });
      console.log(response);
      this.toastr.success('Success', 'Registration successful');
    },
      err => {
        this.toastr.error('', err.error.message, {
          timeOut: 950
        });
      }
    );
  }

  loginUser() {
    const data = new FormData();

    data.append('email', this.email.value);
    data.append('pass', this.pass.value);

    this.httpService.loginUser(data).subscribe(res => {
      // this.router.navigate(['../../employee'], { relativeTo: this.route });
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
