import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  id = this.active.snapshot.paramMap.get('id');
  passForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private active: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.passForm = this.fb.group({
      pass: ['', [Validators.required]],
    });
  }

  get pass() {
    return this.passForm.get('pass');
  }

  changePass() {
    const data = new FormData();

    data.append('pass', this.pass.value);

    this.httpService.changePass(data, this.id).subscribe(res => {
      console.log(res);
      this.router.navigate(['../../login'], { relativeTo: this.active });
      this.toastr.success('Success', 'Password Changed successfully');
    });
  }

}
