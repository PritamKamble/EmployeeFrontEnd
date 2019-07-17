import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { Validators, FormBuilder, FormControl, FormsModule, FormGroup, FormArray, FormArrayName } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  response;
  employeeForm: FormGroup;
  hobbiesError = false;
  techSkillsError = false;
  count = 0;

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
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.employeeForm = this.fb.group({
      firstName: ['test', [Validators.required, Validators.minLength(3)]],
      lastName: ['test', [Validators.required, Validators.minLength(3)]],
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      gender: ['male', [Validators.required]],
      age: ['44', [Validators.required, Validators.pattern('^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|80)$')]],
      dateOfBirth: new Date(),
      salary: ['', [Validators.required]],
      address: ['44', [Validators.required]],
      contact: ['', [Validators.minLength(10), Validators.required]],
      hobbies: new FormArray([]),
      techSkills: [],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.minLength(6)]],
      employeeImage: ['http://localhost:3000/uploads/default-avatar.png', []]
    });

    this.hobbiesArr.map((o, i) => {
      const control = new FormControl(false);
      (this.employeeForm.controls.hobbies as FormArray).push(control);

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

  get dateOfBirth() {
    return this.employeeForm.get('dateOfBirth');
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

  get techSkills() {
    return this.employeeForm.get('techSkills');
  }

  get state() {
    return this.employeeForm.get('state');
  }

  get city() {
    return this.employeeForm.get('city');
  }

  get zipCode() {
    return this.employeeForm.get('zipCode');
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

  onTechSkillsChange(event) {
    this.techSkillsError = true;
    if (this.techSkills.value.length > 1 || this.techSkills.value.length === 0) {
      this.techSkillsError = false;
    }
  }

  onStateChange(stateSelected) {
    this.cities = this.statesCities.find(state => state.name === stateSelected).cities;
    this.employeeForm.get('state').setValue(stateSelected);
    this.employeeForm.get('city').setValue('');
  }

  selectedFile: File = null;

  changeProfile = false;
  onFileSelected(event) {

    if (event.target.files && event.target.files[0]) {
      this.changeProfile = true;
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.employeeImage.setValue(reader.result);
      };
    }
    this.selectedFile = <File>event.target.files[0];
  }

  sendEmployee() {

    const hobbiesArr2 = this.hobbiesArr;

    for (let i = 0; i < hobbiesArr2.length; i++) {
      hobbiesArr2[i].value = this.employeeForm.controls.hobbies.get(i.toString()).value;
    }

    const data = new FormData();

    data.append('firstName', this.firstName.value);
    data.append('lastName', this.lastName.value);
    data.append('email', this.email.value);
    data.append('gender', this.gender.value);
    data.append('age', this.age.value);
    data.append('dateOfBirth', this.dateOfBirth.value);
    data.append('salary', this.salary.value);
    data.append('address', this.address.value);
    data.append('contact', this.contact.value);
    data.append('hobbies', this.hobbies.value);
    data.append('techSkills', JSON.stringify(this.techSkills.value));
    data.append('state', this.state.value);
    data.append('city', this.city.value);
    data.append('zipCode', this.zipCode.value);
    if (this.changeProfile) {
      data.append('employeeImage', this.selectedFile, this.selectedFile.name);
    }


    this.response = this.httpService.sendEmployee(data);
    this.toastr.success('Success', 'Employee Added successfully');
    this.ngOnInit();

  }

}
