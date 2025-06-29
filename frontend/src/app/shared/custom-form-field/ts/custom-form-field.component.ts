import { ChangeDetectorRef, Component, forwardRef, Injector, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormFieldDetails } from '../models/FormFieldDetails';

export class CustomFieldErrorMatcher implements ErrorStateMatcher {
  constructor(private control: AbstractControl<any, any> | null, private errors: any) { }

  isErrorState(): boolean {
    return this.control && this.control.touched && (this.control.invalid || this.errors);
  }
}

@Component({
  selector: 'custom-form-field-group',
  templateUrl: '../template/custom-form-field.component.html',
  styleUrl: '../styles/custom-form-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomFormFieldComponent),
    }
  ],
})
export class CustomFormFieldComponent implements ControlValueAccessor {

  constructor(
    public injector: Injector,
    private cdRef: ChangeDetectorRef
  ) {
  }

  private innerValue: any;

  @Input() formFieldDetails!: FormFieldDetails;
  @Input() isRequired!: boolean;

  id!: string;
  maxLength!: string | null;
  index!: number | null;
  icone!: string | null;
  type!: string;
  label!: string;
  hint!: string | null;
  placeHolder!: string | null;
  required!: boolean;
  control!: AbstractControl<any, any> | null;
  disabled!: boolean;

  ngAfterViewInit(): void {
    this.id = this.formFieldDetails.id;
    this.maxLength = this.formFieldDetails.maxLength;
    this.index = this.formFieldDetails.index;
    this.icone = this.formFieldDetails.icone;
    this.type = this.formFieldDetails.type;
    this.label = this.formFieldDetails.label;
    this.hint = this.formFieldDetails.hint;
    this.placeHolder = this.formFieldDetails.placeHolder;
    this.control = this.formFieldDetails.control;
    this.disabled = this.control?.disabled ? true : false;
    const ngControl: NgControl | null = this.injector.get(NgControl, null);

    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
      })
    }

    this.cdRef.detectChanges();
  }

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: (_: any) => void = () => { };
  onTouchCb: (_: any) => void = () => { };

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchCb = fn;
  }

  writeValue(v: any) {
    this.value = v;
  }

  setDisabledState(isDisabled: boolean) { this.disabled = isDisabled; }

  errorMatcher() {
    return new CustomFieldErrorMatcher(this.control, this.control?.errors)
  }

  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (ctrl: FormControl) => (ctrl && ctrl.invalid)
  };

  geraMensagemErro(): string {
    if (this.control?.errors?.['nameWrong'] != null) {
      return 'Campo inválido';
    }
    else if (this.control?.errors?.['required'] != null) {
      return 'Campo obrigatório';
    }
    else if (this.control?.errors?.['maxlength'] != null) {
      return 'Tamanho máximo do campo excedido';
    }
    else if (this.control?.errors?.['pattern'] != null) {
      return 'Campo inválido';
    }
    else {
      return 'Campo inválido';
    }
  }
}