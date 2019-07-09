import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormsModule, FormGroup, FormArray } from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  data = [];
  hobbiesError = false;
  count = 0;
  id = this.active.snapshot.paramMap.get('id');
  imageChange = false;
  selectedFile: File = null;

  hobbiesArr = [{ id: 0, name: 'reading', value: 'false' },
  { id: 1, name: 'cooking', value: 'false' },
  { id: 2, name: 'coding', value: 'false' },
  { id: 3, name: 'writing', value: 'false' }];

  statesCities = [
    {
      name: 'Maharashtra', cities: [
        'Pune',
        'Mumbai',
        'Nashik'
      ]
    },
    {
      name: 'Karnataka', cities: [

        'Bangalore',
        'Mysore',
        'Coorg',
        'Hampi',
        'Mangalore'
      ]
    }
  ];

  cities: Array<any>;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private active: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      gender: ['male', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern('^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|80)$')]],
      salary: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      hobbies: new FormArray([]),
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      employeeImage: ['', []]
    });

    this.hobbiesArr.map((o, i) => {

      const control = new FormControl(false); // if first item set to true, else false
      (this.employeeForm.controls.hobbies as FormArray).push(control);

    });

    this.httpService.getDataByID(this.id).subscribe(res => {

      const hobbiesarr = res.emp.hobbies.split(',');

      this.onStateChange(res.emp.state);

      this.employeeForm.get('firstName').patchValue(res.emp.firstName);
      this.employeeForm.get('lastName').patchValue(res.emp.lastName);
      this.employeeForm.get('email').patchValue(res.emp.email);
      this.employeeForm.get('gender').patchValue(res.emp.gender);
      this.employeeForm.get('age').patchValue(res.emp.age);
      this.employeeForm.get('salary').patchValue(res.emp.salary);
      this.employeeForm.get('address').patchValue(res.emp.address);
      this.employeeForm.get('contact').patchValue(res.emp.contact);
      this.employeeForm.get('city').patchValue(res.emp.city);


      this.employeeImage.patchValue("http://localhost:3000/" + res.emp.employeeImage);


      for (let i = 0; i < this.hobbiesArr.length; i++) {
        this.employeeForm.controls.hobbies.get(i.toString()).patchValue(hobbiesarr[i] === 'true' ? true : false);
        if (hobbiesarr[i] === "true") {
          this.count++;
        }
      }


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

  get gender() {
    return this.employeeForm.get('gender');
  }

  get age() {
    return this.employeeForm.get('age');
  }

  get salary() {
    return this.employeeForm.get('salary');
  }

  get address() {
    return this.employeeForm.get('address');
  }

  get contact() {
    return this.employeeForm.get('contact');
  }

  get hobbies() {
    return this.employeeForm.get('hobbies') as FormArray;
  }

  get state() {
    return this.employeeForm.get('state');
  }

  get city() {
    return this.employeeForm.get('city');
  }

  get employeeImage() {
    return this.employeeForm.get('employeeImage');
  }

  onCheckBoxClick(event) {

    this.hobbiesError = true;


    if (event.target.checked) {
      this.count++;
    } else {
      this.count--;
    }

    if (this.count > 1) {
      this.hobbiesError = false;
    }

  }

  onStateChange(stateSelected) {
    this.cities = this.statesCities.find(state => state.name === stateSelected).cities;
    this.employeeForm.get('state').setValue(stateSelected);
    this.employeeForm.get('city').setValue('');
  }

  onFileSelected(event) {
    this.imageChange = true;
    this.selectedFile = <File>event.target.files[0];
  }

  updateEmployee() {


    const data = new FormData();

    data.append('firstName', this.firstName.value);
    data.append('lastName', this.lastName.value);
    data.append('email', this.email.value);
    data.append('gender', this.gender.value);
    data.append('age', this.age.value);
    data.append('salary', this.salary.value);
    data.append('address', this.address.value);
    data.append('contact', this.contact.value);
    data.append('hobbies', this.hobbies.value);
    data.append('state', this.state.value);
    data.append('city', this.city.value);

    if (this.imageChange) {
      data.append('employeeImage', this.selectedFile, this.selectedFile.name);
    }

    this.httpService.updateData(data, this.id).subscribe(res => {
      this.router.navigate(['../list'], { relativeTo: this.route });
    });
  }

}
