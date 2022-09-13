import { Router } from "@angular/router";
import { Userdetail } from "./../listing-user/userdetail";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastService } from "./../../shared/components/toast/toast.service";
import { ModalService } from "./../../shared/components/modal/modal.service";
import { Component, OnInit } from "@angular/core";
import { UserListingService } from "./user-listing.service";
import { ErrorMessages } from "src/app/shared/components/text-input/error-messages";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
@Component({
  selector: "app-user-listing",
  templateUrl: "./user-listing.component.html",
  styleUrls: ["./user-listing.component.css"],
})
export class UserListingComponent implements OnInit {
  data: any[] = [];
  txtfirstname = "";
  txtlastname = "";
  ispage = 0;
  pageSize = 10;
  txtIdpassport = "";
  txtCountry = "";
  txtPhoneNumber = "";
  txtAddress = "";
  txtEmail = "";
  tem = "";
  txtdate = "";
  idUser = "";
  statusToast = "";
  MessToast = "";
  totalPage: number[] = [];
  checkedSex: "other" | "male" | "female" | "" = "";
  form: FormGroup;
  lastname = "";
  firstname = "";
  users$!: Observable<Userdetail[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private userlistingsv: UserListingService,
    private modalsv: ModalService,
    private toastsv: ToastService,
    private f: FormBuilder,
    private translate: TranslateService,
    private router: Router
  ) {
    this.form = this.f.group({
      lastname: [this.txtlastname],
      fistname: [this.txtfirstname],
      idpassport: [this.txtIdpassport],
      email: [this.txtEmail, [Validators.required]],
      country: [this.txtCountry],
      phonenumber: [this.txtPhoneNumber],
      address: [this.txtAddress],
    });
  }

  get fields() {
    return this.form.controls;
  }
  ngOnInit() {
    this.search();
    this.userlistingsv.getUser(this.getUrl()).subscribe((data: any) => {
      this.data = data.content;
      console.log(data.content);
      for (let i = 0; i < data.totalPages; i++) {
        this.totalPage.push(i);
      }
    });
    document.body.style.backgroundColor = "white";
  }
  loadApi() {
    return this.userlistingsv.getUser(this.getUrl()).subscribe((data: any) => {
      this.data = data.content;
      this.totalPage.length = 0;

      for (let i = 0; i < data.totalPages; i++) {
        this.totalPage.push(i);
      }
    });
  }
  getUrl() {
    return (
      "users/pagination?pageNo=" + this.ispage + "&pageSize=" + this.pageSize
    );
  }
  next() {
    this.ispage++;
    this.loadApi();
  }

  Prev() {
    if (!(this.ispage === 0)) {
      this.ispage--;
      this.loadApi();
    }
  }

  checkSex(sex: "other" | "male" | "female") {
    this.checkedSex = sex;
  }
  changesize(e: any) {
    this.pageSize = e.target.value;
    this.ispage = 0;
    this.loadApi();
  }
  changePage(page: number) {
    this.ispage = page;
    this.loadApi();
  }
  openModal(id: string, lastname: string, firstname: string, iduser: string) {
    this.modalsv.open(id);
    this.lastname = lastname;
    this.firstname = firstname;
    this.idUser = iduser;
    console.log(this.idUser);
  }
  openModalAdd(id: string) {
    this.modalsv.open(id);
  }
  openToast(statusToast: string, MessToast: string, timeout = 3000) {
    this.toastsv.open("notifi");
    setTimeout(() => {
      this.closeToast();
    }, timeout);
  }

  closeModal(id: string) {
    this.modalsv.close(id);
  }
  closeToast() {
    this.toastsv.close("notifi");
  }
  deleteuser(id: string) {
    this.userlistingsv.deleteuser("users/delete/" + this.idUser).subscribe({
      next: () => {
        this.statusToast = "Succeed";
        this.MessToast = "Xóa người dùng thành công";
        this.openToast(this.statusToast, this.MessToast);
        this.loadApi();
        this.closeModal(id);
      },
      error: (err) => {
        if (err.status === 200) {
          this.statusToast = "Succeed";
          this.MessToast = "Xóa người dùng thành công";
          this.openToast(this.statusToast, this.MessToast);
          this.loadApi();
          this.closeModal(id);
        } else {
          this.statusToast = "Faild";
          this.MessToast = "Xóa người dùng thất bại";
          this.openToast(this.statusToast, this.MessToast);
          this.loadApi();
          this.closeModal(id);
        }
      },
    });
  }

  search() {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.userlistingsv.searchUser(term))
      )
      .subscribe((data: any) => {
        this.totalPage = [];
        this.data = data.content;
        for (let i = 0; i < data.totalPages; i++) {
          this.totalPage.push(i);
        }
      });
  }

  searchterm(term: string): void {
    this.searchTerms.next(
      "users/search/pagination/?pageNo=" +
        this.ispage +
        "&pageSize=" +
        this.pageSize +
        "&search=" +
        term
    );
  }

  usernameFieldErrors: ErrorMessages = {
    required: () => this.translate.instant("Không được trống"),
  };
  selectUser(id: string) {
    this.router.navigate(["profile/" + id]);
  }
  txtsex = "";
  addUser() {
    this.userlistingsv
      .addUser(
        this.txtEmail,
        this.txtAddress,
        this.txtdate,
        this.txtCountry,
        this.txtfirstname,
        this.txtlastname,
        this.txtsex,
        this.txtIdpassport,
        this.txtPhoneNumber
      )
      .subscribe({
        next: () => {
          this.statusToast = "Succeed";
          this.MessToast = "Thêm người dùng thành công";
          this.openToast(this.statusToast, this.MessToast);
          this.loadApi();
          this.closeModal("addUser");
        },
        error: (err) => {
          this.statusToast = "Faild";
          this.MessToast = "Thêm người dùng thất bại";
          this.openToast(this.statusToast, this.MessToast);
          this.loadApi();
          this.closeModal("addUser");
        },
      });
  }
}
