import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-master-page",
  templateUrl: "./master-page.component.html",
  styleUrls: ["./master-page.component.css"],
})
export class MasterPageComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  username = localStorage.getItem("username");
  userid? = localStorage.getItem("userid");
  isChecked = "home";
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        if (
          event.url === "/login" ||
          event.url === "forgot-password" ||
          event.url === "changepassword"
        ) {
          this.check = false;
        } else this.check = true;
      }
    });
  }
  /*  style(url: string) {
    switch (url) {
      case "/home": {
        if (this.menu) return "fill-textblue";
        else return "bg-textblue text-white fill-white";
      }
    }
  } */
  close() {
    this.profile = false;
  }
  open() {
    this.profile = true;
  }
  check = true;
  menu = true;
  edit = false;
  url = "";
  profile = false;
  openMenu() {
    if (
      this.url === "/changepassword" ||
      this.url === "/profile/" + this.userid
    ) {
      if (this.menu) {
        this.menu = !this.menu;
        this.edit = true;
        this.profile = true;
      } else {
        this.menu = !this.menu;
        this.edit = false;
      }
    } else {
      this.menu = !this.menu;
      this.edit = false;
    }
  }
  openEdit() {
    if (this.menu) {
      this.router.navigate(["/profile/" + this.userid]);
      this.edit = true;
      this.menu = !this.menu;
      this.profile = true;
    } else {
      this.edit = !this.edit;
      this.profile = false;
    }
  }

  logOut() {
    localStorage.removeItem("authToken");
  }
  setLocal(value: string) {
    localStorage.setItem("page", value);
  }
  isProfile() {
    if (this.url.includes("profile")) return true;
    else return false;
  }
}
