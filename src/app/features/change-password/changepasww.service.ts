import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ChangepaswwService {
  apiurl: string = environment.api;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  createHeader() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("authToken") + "",
    });
    return headers;
  }
  constructor(private http: HttpClient) {}
  changepass(pass: string, newpass: string) {
    const header = this.createHeader();
    return this.http.put(
      this.apiurl + "password/update",
      {
        newPassword: pass,
        password: newpass,
      },
      {
        headers: header,
      }
    );
  }
}
