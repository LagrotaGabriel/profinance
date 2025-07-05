import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusProcessamento } from '../../../../../../../../models/StatusProcessamento';
import { Util } from '../../../../../../../../utils/Util';

@Injectable({
  providedIn: 'root'
})
export class CadastroViewFormService {

  private _formGroupValores!: FormGroup;
  private _formStatusValores: StatusProcessamento = StatusProcessamento.ABERTO;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public iniciaService() {

    this.formGroupValores = this.constroiFormularioValores();
    this.formStatusValores = StatusProcessamento.ABERTO;
  }

  public destroiService() {
    this.resetaVariaveis();
  }

  public resetaVariaveis() {
    this.formStatusValores = StatusProcessamento.ABERTO;
    this.formGroupValores.reset();
    this.formGroupValores = this.constroiFormularioValores();
  }

  public constroiFormularioValores(): FormGroup {
    return this.formBuilder.group({
      name: [
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.maxLength(60)
        ]
      ],
      type: [
        {
          value: 'OUTPUT',
          disabled: false
        },
        [
          Validators.required,
        ]
      ],
    });
  }

  public verificaSeFormularioEstaValidoParaSerEnviado(): boolean {

    if (this.formGroupValores.invalid) return false;

    return true;
  }
  /* ======================== Getters e Setters ======================== */

  public getFormValueValores(atributo: string): any {
    if (Util.isEmptyString(this.formGroupValores.controls[atributo].value))
      return null;
    else {
      return this.formGroupValores.controls[atributo].value;
    }
  }

  public setFormValueValores(atributo: string, valor: any) {
    this.formGroupValores.controls[atributo].setValue(valor);
  }

  public isFormValidValores(atributoFormulario: string): boolean {
    return this.formGroupValores.controls[atributoFormulario].valid;
  }

  get formGroupValores(): FormGroup {
    return this._formGroupValores;
  }

  set formGroupValores(formGroup: FormGroup) {
    this._formGroupValores = formGroup;
  }

  get formStatusValores(): StatusProcessamento {
    return this._formStatusValores;
  }

  set formStatusValores(formStatusValores: StatusProcessamento) {
    this._formStatusValores = formStatusValores;
  }
}