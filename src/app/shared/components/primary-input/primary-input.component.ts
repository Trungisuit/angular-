import { Component, forwardRef, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { ErrorMessages } from "../text-input/error-messages";

@Component({
  selector: "app-primary-input",
  templateUrl: "./primary-input.component.html",
  styleUrls: ["./primary-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true,
    },
  ],
})
export class PrimaryInputComponent implements OnInit {
  private _value?: string;
  @Input() data = "";
  @Input() placeholder = "";
  touch = false;
  @Input() title = "";
  @Input() edit = false;
  @Input() IsReadonly = false;
  @Input() Primary = true;
  @Input() Isdisabled = false;
  @Input() isFixed = false;
  inputType?: "password" | "text";
  checkicon = "/assets/icons/NonEyeSlash.svg";
  @Input() isPassword?: boolean;
  set value(value: string) {
    if (this.onChanged) {
      this.onChanged(value);
    }
    this._value = value;
  }
  get value(): string {
    return this._value ?? "";
  }
  ngOnInit(): void {
    this.inputType = this.isPassword ? "password" : "text";
  }

  @Input() formFieldControl?: AbstractControl = new FormControl();

  @Input() errrorMessages: ErrorMessages = {};

  get firstErrorMessage() {
    const errors = this.formFieldControl?.errors;
    if (!errors) {
      return undefined;
    }
    const firstError = Object.keys(errors).find((error) => errors[error]);
    if (firstError) {
      let message = this.errrorMessages[firstError];
      if (message instanceof Function) {
        message = message(errors[firstError]);
      }
      if (message) {
        return message;
      } else {
        return `[Error ${firstError}]`;
      }
    } else {
      return undefined;
    }
  }

  onChanged?: (value: string) => void;
  onTouched: () => void = () => {
    // do nothing for default
  };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => never): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  focusOutFunction() {
    this.touch = !this.touch;
  }
  focusFunction() {
    this.touch = false;
  }
  toggleEyeIcon() {
    if (this.inputType === "password") {
      this.checkicon = "/assets/icons/EyeSlash.svg";
      this.inputType = "text";
    } else {
      this.inputType = "password";
      this.checkicon = "/assets/icons/NonEyeSlash.svg";
    }
  }
}
