import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormsModule, FormGroup, FormArray } from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ageValidator, contactValidator, emailValidator, nameValidator, skillsValidator } from '../../validators';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  data = [];
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
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: ['', nameValidator],
      lastName: ['', nameValidator],
      email: ['', emailValidator],
      gender: ['male'],
      age: ['', ageValidator],
      dateOfBirth: new Date(),
      salary: [''],
      address: [''],
      contact: ['', contactValidator],
      hobbies: new FormArray([]),
      techSkills: ['', skillsValidator],
      state: [''],
      city: [''],
      zipCode: ['', [Validators.minLength(6)]],
      employeeImage: ['', []]
    });

    this.hobbiesArr.map((o, i) => {

      const control = new FormControl(false); // if first item set to true, else false
      (this.employeeForm.controls.hobbies as FormArray).push(control);

    });

    this.httpService.getDataByID(this.id).subscribe(res => {

      const hobbiesarr = res.emp.hobbies.split(',');

      if (res.emp.state) {
        this.onStateChange(res.emp.state);
        this.employeeForm.get('city').setValue(res.emp.city);
      } else {
        this.employeeForm.get('state').setValue('');
        this.employeeForm.get('city').setValue('');
      }

      this.employeeForm.get('firstName').patchValue(res.emp.firstName);
      this.employeeForm.get('lastName').patchValue(res.emp.lastName);
      this.employeeForm.get('email').patchValue(res.emp.email);
      this.employeeForm.get('gender').patchValue(res.emp.gender);
      this.employeeForm.get('age').patchValue(res.emp.age);
      this.employeeForm.get('dateOfBirth').patchValue(res.emp.dateOfBirth ? new Date(res.emp.dateOfBirth) : '');
      this.employeeForm.get('salary').patchValue(res.emp.salary);
      this.employeeForm.get('address').patchValue(res.emp.address);
      this.employeeForm.get('contact').patchValue(res.emp.contact);
      this.employeeForm.get('zipCode').patchValue(res.emp.zipCode);
      this.employeeForm.get('techSkills').patchValue((res.emp.techSkills ? JSON.parse(res.emp.techSkills) : ''));

      this.employeeImage.patchValue('http://localhost:3000/' + res.emp.employeeImage);


      for (let i = 0; i < this.hobbiesArr.length; i++) {
        this.employeeForm.controls.hobbies.get(i.toString()).patchValue(hobbiesarr[i] === 'true' ? true : false);
        if (hobbiesarr[i] === 'true') {
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
    return this.employeeForm.get('hobbies');
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
    if (event.target.checked) {
      this.count++;
    } else {
      this.count--;
    }

    if (this.count > 1 || this.count === 0) {
      this.hobbies.clearValidators();
      this.hobbies.updateValueAndValidity();
    } else {
      this.hobbies.setValidators(Validators.requiredTrue);
      this.hobbies.updateValueAndValidity();
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
    data.append('dateOfBirth', this.dateOfBirth.value);
    data.append('salary', this.salary.value);
    data.append('address', this.address.value);
    data.append('contact', this.contact.value);
    data.append('hobbies', this.hobbies.value);
    data.append('techSkills', JSON.stringify(this.techSkills.value));
    data.append('state', this.state.value);
    data.append('city', this.city.value);
    data.append('zipCode', this.zipCode.value);

    if (this.imageChange) {
      data.append('employeeImage', this.selectedFile, this.selectedFile.name);
    }

    this.httpService.updateData(data, this.id).subscribe(res => {
      this.router.navigate(['../../list'], { relativeTo: this.route });
      this.toastr.success('Success', 'Employee Added successfully');
    });
  }

}
