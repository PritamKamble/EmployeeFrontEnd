import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder, FormControl, FormsModule, FormGroup, FormArray, FormArrayName } from '@angular/forms';
import { HttpService } from '../shared/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  response;
  employeeForm: FormGroup;
  modalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {

    this.employeeForm = this.fb.group({
      firstName: ['test', [Validators.required, Validators.minLength(3)]],
      lastName: ['test', [Validators.required, Validators.minLength(3)]],
      email: ['test@gmail.com', [Validators.required, Validators.email]]
    });

  }

  get firstName() {
    return this.employeeForm.get('firstName');
  }

  get lastName() {
    return this.employeeForm.get('lastName');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  openModal(template: TemplateRef<any>) {
    this.ngOnInit();
    this.modalRef = this.modalService.show(template);
  }

  sendEmployee() {

    const data = new FormData();

    data.append('firstName', this.firstName.value);
    data.append('lastName', this.lastName.value);
    data.append('email', this.email.value);

    this.response = this.httpService.sendEmployee(data);
    this.toastr.success('Success', 'Employee Added successfully');
    this.modalRef.hide();


  }

}
