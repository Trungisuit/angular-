import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  apiurl: string = environment.api;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) {}
  createHeader() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("authToken") + "",
    });
    return headers;
  }
  getUser(url: string) {
    const headers = this.createHeader();
    return this.http.get(this.apiurl + url, {
      headers: headers,
    });
  }
  changeStatus(url: string) {
    const headers = this.createHeader();
    return this.http.get(this.apiurl + url, {
      headers: headers,
    });
  }
  updateUser(
    email: string,
    address: string,
    date: string,
    country: string,
    fsname: string,
    lastname: string,
    sex: string,
    passport: string,
    phone: string,
    id: string
  ) {
    const headers = this.createHeader();
    return this.http.put(
      this.apiurl + id,
      {
        address: address,
        birthDate: date,
        country: country,
        email: email,
        firstName: fsname,
        gender: sex,
        lastName: lastname,
        passportNumber: passport,
        phone: phone,
      },
      {
        headers: headers,
      }
    );
  }
}
