import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = 'http://localhost:3000/employee/';

  constructor(private http: HttpClient) { }

  sendEmployee(data) {
    this.http.post<any>(this.url, data).subscribe(response => {
      return response;
    });
  }

  getData() {
    return this.http.get<any>(this.url);
  }

  getDataByID(id) {
    return this.http.get<any>(this.url + id);
  }

  deleteData(id) {
    return this.http.delete<any>(this.url + id);
  }

  updateData(data, id) {
    return this.http.patch<any>(this.url + id, data);
  }
}
