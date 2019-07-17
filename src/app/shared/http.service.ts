import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  empUrl = 'http://localhost:3000/employee/';
  authUrl = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  sendEmployee(data) {
    this.http.post<any>(this.empUrl, data, this.httpOptions).subscribe(response => {
      return response;
    });
  }

  getData() {
    console.log(this.httpOptions);
    return this.http.get<any>(this.empUrl, this.httpOptions);
  }

  getDataByID(id) {
    return this.http.get<any>(this.empUrl + id, this.httpOptions);
  }

  deleteData(id) {
    return this.http.delete<any>(this.empUrl + id, this.httpOptions);
  }

  updateData(data, id) {
    return this.http.patch<any>(this.empUrl + id, data, this.httpOptions);
  }

  registerUser(data) {
    return this.http.post<any>(this.authUrl + 'register', data);
  }

  loginUser(data) {
    return this.http.post<any>(this.authUrl + 'login', data);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
