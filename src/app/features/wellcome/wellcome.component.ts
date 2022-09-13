import { Router } from "@angular/router";
import { Component } from "@angular/core";

@Component({
  selector: "app-wellcome",
  templateUrl: "./wellcome.component.html",
  styleUrls: ["./wellcome.component.css"],
})
export class WellcomeComponent {
  constructor(private router: Router) {}
  redSsoAdmin() {
    this.router.navigate(["/listuser"]);
  }
}
