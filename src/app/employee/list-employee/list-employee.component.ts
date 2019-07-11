import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  empObj = [];

  employeeForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.employeeForm = this.fb.group({
      id: [{
        value: '',
        disabled: true
      }],
      firstName: ['', []],
      lastName: ['', []],
      email: ['', []]
    });

    this.httpService.getData().subscribe(response => {
      this.empObj = response;
    });
  }

  updateEmployee(id) {

    this.router.navigate(['../update/' + id], { relativeTo: this.route });
  }

  deleteEmployee(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this file!',
      icon: 'warning',
      buttons: { confirm: true, cancel: true },
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.httpService.deleteData(id).subscribe(result => {
            this.ngOnInit();
          });
          swal('Employee has been deleted!', {
            icon: 'success',
          });
        } else {
          swal('Your imaginary file is safe!');
        }
      });
  }
}
