import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {

  resetForm: FormGroup;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private active: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required]]
    });
  }

  get email() {
    return this.resetForm.get('email');
  }

  reset() {
    const data = new FormData();

    data.append('email', this.email.value);

    this.httpService.reset(data).subscribe(res => {
      console.log(res);
      this.router.navigate(['../login'], { relativeTo: this.active });
      this.toastr.success('login to your Gmail', 'Email is sent to your Account');
    },
      err => {
        this.toastr.error('', err.error.message, {
          timeOut: 850
        });
      });
  }

}
