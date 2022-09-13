import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Userdetail } from "../listing-user/userdetail";

@Injectable({
  providedIn: "root",
})
export class UserListingService {
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
    return this.http.get<Userdetail[]>(this.apiurl + url, {
      headers: headers,
    });
  }
  deleteuser(id: string) {
    const headers = this.createHeader();
    return this.http.delete(this.apiurl + id, {
      headers: headers,
    });
  }
  searchUser(name: string) {
    const headers = this.createHeader();
    return this.http.get<Userdetail[]>(this.apiurl + name, {
      headers: headers,
    });
  }
  addUser(
    email: string,
    address: string,
    date: string,
    country: string,
    fsname: string,
    lastname: string,
    sex: string,
    passport: string,
    phone: string
  ) {
    const headers = this.createHeader();
    return this.http.post<Userdetail[]>(
      this.apiurl + "users/create",
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
