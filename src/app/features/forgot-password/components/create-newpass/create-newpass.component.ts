import { ForgotPasswordService } from "./../../forgot-password.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component } from "@angular/core";
import { ErrorMessages } from "src/app/shared/components/text-input/error-messages";
import { TranslateService } from "@ngx-translate/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
@Component({
  selector: "app-create-newpass",
  templateUrl: "./create-newpass.component.html",
  styleUrls: ["./create-newpass.component.css"],
})
export class CreateNewpassComponent {
  createNewPassword: FormGroup;
  authToken = "";
  password = "";
  repeatpassword = "";
  check = false;
  statusToast = "";
  MessToast = "";
  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private r: ActivatedRoute,
    private router: Router,
    private trans: TranslateService,
    private forgotPasswordService: ForgotPasswordService
  ) {
    (this.createNewPassword = this.formBuilder.group(
      {
        password: [
          this.password,
          [Validators.required, Validators.minLength(6), rex],
        ],
        repeatPassword: [
          this.repeatpassword,
          [Validators.required, Validators.minLength(6), rex, matchpass],
        ],
      },
      Validators.required
    )),
      (this.authToken = String(this.r.snapshot.queryParamMap.get("token")));
  }
  get fields() {
    return this.createNewPassword.controls;
  }
  passwordFieldErrors: ErrorMessages = {
    required: () => this.translate.instant("password-is-required"),
    minlength: (error) =>
      this.translate.instant("error-password-min-length", error),
    rex: () => this.trans.instant("Wrong password format "),
    matchpass: () => this.trans.instant("Pass not match"),
  };
  back() {
    this.router.navigate(["/login"]);
  }
  createnewpass() {
    if (this.password === this.repeatpassword) {
      this.check = false;
      this.forgotPasswordService
        .changepass(this.authToken, this.password)
        .subscribe({
          next() {
            window.alert("Change password successfully");
          },
          error() {
            window.alert("link was too limit");
          },
        });
    } else {
      this.check = true;
    }
  }

  ishidden(): boolean {
    if (this.createNewPassword.valid) return false;
    return true;
  }
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

/* function createdoupassmatchvalidator(getpassword:()=>string){
  return function noSpaceValidator(
    control: AbstractControl
  ): ValidationErrors | undefined {let password :string
    try {
      password = getpassword()
      
    } catch (error) {
      password = ''
    }
    if (password !== control.value) {
      return {
        match: true,
      };
    }
    return undefined;
  }
} */

function matchpass(c: AbstractControl): ValidationErrors | undefined {
  if (c.parent?.get("password")?.value !== c.value) {
    return { matchpass: true };
  }
  return undefined;
}
