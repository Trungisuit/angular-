import { TranslateService } from "@ngx-translate/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { Component } from "@angular/core";
import { ErrorMessages as ErrorMessages } from "./shared/components/text-input/error-messages";

function noSpaceValidator(
  control: AbstractControl
): ValidationErrors | undefined {
  const value: string = control.value;
  if (value.match(/\s/)) {
    return {
      spaces: true,
    };
  }
  return undefined;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "ESSO";
  txtusername = "";
  txtpassword = "";
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this.form = this.formBuilder.group({
      username: [this.txtusername, [Validators.required, noSpaceValidator]],
    });
  }
  get fields() {
    return this.form.controls;
  }
  onSubmit() {
    // do nothing for now
  }

  passwordFieldErrors: ErrorMessages = {
    required: () => this.translate.instant("password-is-required"),
    minlength: (error) =>
      this.translate.instant("error-password-min-length", error),
  };

  usernameFieldErrors: ErrorMessages = {
    required: () => this.translate.instant("username-is-required"),
    spaces: () => this.translate.instant("error-username-with-space"),
  };
  a() {
    console.log(this.txtusername);
  }
}
