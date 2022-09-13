import { ToastService } from "./../../shared/components/toast/toast.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProfileService } from "./profile.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ErrorMessages } from "src/app/shared/components/text-input/error-messages";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-profile-user",
  templateUrl: "./profile-user.component.html",
  styleUrls: ["./profile-user.component.css"],
})
export class ProfileUserComponent implements OnInit {
  status = "Deactive";
  isEdit = true;
  statusToast = "";
  MessToast = "";
  checkedSex: "other" | "male" | "female" = "other";
  edit() {
    this.isEdit = !this.isEdit;
  }
  checkSex(sex: "other" | "male" | "female") {
    this.checkedSex = sex;
  }
  form: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profilesv: ProfileService,
    private f: FormBuilder,
    private translate: TranslateService,
    private toastsv: ToastService
  ) {
    this.form = this.f.group({
      lastname: [this.txtlastname, [Validators.required]],
      fistname: [this.txtfirstname, [Validators.required]],
      idpassport: [this.txtIdpassport],
      email: [this.txtEmail],
      country: [this.txtCountry],
      phonenumber: [this.txtPhoneNumber],
      address: [this.txtAddress],
      userId: [this.txtUserId],
    });
  }
  get fields() {
    return this.form.controls;
  }
  openToast(statusToast: string, MessToast: string, timeout = 3000) {
    this.toastsv.open("notifi");
    setTimeout(() => {
      this.closeToast();
    }, timeout);
  }
  closeToast() {
    this.toastsv.close("notifi");
  }
  FieldErrors: ErrorMessages = {
    required: () => this.translate.instant("Không được trống"),
  };
  txtdate = "";
  txtsex = "";
  txtIdpassport = "";
  txtlastname = "";
  txtfirstname = "";
  txtAddress = "";
  txtPhoneNumber = "";
  txtEmail = "";
  txtCountry = "";
  txtUserId = "";
  avt = "";
  username = "";
  ngOnInit(): void {
    console.log(this.route.snapshot.params["id"]);
    this.getuser();
    document.body.style.backgroundColor = "white";
  }

  changestatus() {
    if (!this.status) {
      this.profilesv
        .changeStatus("users/activateUser/" + this.route.snapshot.params["id"])
        .subscribe({
          next: () => {
            this.getuser();
            this.openToast("Succeed", "Kích hoạt tài khoản thành công");
          },
          error: (err) => {
            this.openToast("Thất Bại", "Kích hoạt tài khoản thất bại");
          },
        });
    } else {
      this.profilesv
        .changeStatus(
          "users/deactivateUser/" + this.route.snapshot.params["id"]
        )
        .subscribe({
          next: () => {
            this.getuser();
            this.statusToast = "Succeed";
            this.MessToast = "Vô hiệu hóa hoạt tài khoản thành công";
            this.openToast(this.statusToast, this.MessToast);
          },
          error: (err) => {
            this.statusToast = "Faild";
            this.MessToast = "Vô hiệu hóa hoạt tài khoản thất bại";
            this.openToast(this.statusToast, this.MessToast);
          },
        });
    }
  }
  getuser() {
    return this.profilesv
      .getUser("users/get/" + this.route.snapshot.params["id"])
      .subscribe((data: any) => {
        this.txtlastname = data.lastName;
        this.txtfirstname = data.firstName;
        this.txtAddress = data.address;
        this.txtCountry = data.country;
        this.checkedSex = data.gender;
        this.txtPhoneNumber = data.phone;
        this.txtEmail = data.email;
        this.txtUserId = data.userID;
        this.status = data.enabled;
        this.avt = data.avatar;
        this.username = data.username;
      });
  }

  updateUser() {
    this.profilesv
      .updateUser(
        this.txtEmail,
        this.txtAddress,
        this.txtdate,
        this.txtCountry,
        this.txtfirstname,
        this.txtlastname,
        this.txtsex,
        this.txtIdpassport,
        this.txtPhoneNumber,
        "users/update/" + this.route.snapshot.params["id"]
      )
      .subscribe({
        next: () => {
          this.statusToast = "Succeed";
          this.MessToast = "Sửa người dùng thành công";
          this.openToast(this.statusToast, this.MessToast);
        },
        error: () => {
          this.statusToast = "Faild";
          this.MessToast = "Sửa người dùng thất bại";
          this.openToast(this.statusToast, this.MessToast);
        },
      });
  }
}
