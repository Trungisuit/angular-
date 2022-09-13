import { ChangepaswwService } from "./changepasww.service";
import { TranslateService } from "@ngx-translate/core";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { ErrorMessages } from "src/app/shared/components/text-input/error-messages";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  txtOldPass = "";
  txtNewPass = "";
  txtReNewPass = "";
  constructor(
    private f: FormBuilder,
    private translate: TranslateService,
    private changepassSv: ChangepaswwService
  ) {
    this.form = this.f.group({
      oldPass: [
        this.txtOldPass,
        [Validators.required, Validators.minLength(6), rex],
      ],
      newPass: [
        this.txtNewPass,
        [Validators.required, Validators.minLength(6), rex],
      ],
      reNewPass: [
        this.txtReNewPass,
        [Validators.required, Validators.minLength(6), rex, matchpass],
      ],
    });
  }
  ngOnInit(): void {
    document.body.style.backgroundColor = "white";
  }
  get fields() {
    return this.form.controls;
  }

  ChangePasss() {
    this.changepassSv.changepass(this.txtOldPass, this.txtNewPass).subscribe({
      next: () => {
        console.log("Đổi mật khẩu thành công");
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  FieldErrors: ErrorMessages = {
    required: () => this.translate.instant("password-is-required"),
    minlength: (error) =>
      this.translate.instant("error-password-min-length", error),
    rex: () => this.translate.instant("Wrong password format "),
    matchpass: () => this.translate.instant("Pass not match"),
  };
}
function rex(control: AbstractControl): ValidationErrors | undefined {
  const re = new RegExp(
    "^(?=.*\\d)(?=.*[a-z])(?=.*[@]+.*)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
  );
  if (!re.test(control.value)) {
    return {
      rex: true,
    };
  }
  return undefined;
}

function matchpass(c: AbstractControl): ValidationErrors | undefined {
  if (c.parent?.get("newPass")?.value !== c.value) {
    return { matchpass: true };
  }
  return undefined;
}
