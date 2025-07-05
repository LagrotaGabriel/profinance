import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
      description: [
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.maxLength(60)
        ]
      ],
      value: [0.0,
        [
          Validators.min(1),
          Validators.required,
          Validators.max(999999999),
          Validators.pattern(Util.monetaryRegex)
        ]
      ],
      expirationDate: [
        {
          value: Util.formataDataDoTipoDateParaStringNoPadraoAmericano(new Date()),
          disabled: false
        },
        [
          Validators.required,
          Validators.pattern(Util.dateRegex)
        ]
      ],
      executionDate: [
        {
          value: null,
          disabled: true
        },
        [
          Validators.required,
          Validators.pattern(Util.dateRegex)
        ]
      ],
      status: [
        {
          value: 'PENDING',
          disabled: false
        },
        [
          Validators.required,
        ]
      ],
      categoryId: [
        {
          value: null,
          disabled: false
        },
        [
          Validators.required,
        ]
      ],
    });
  }

  public realizaTratamentoDeFormularioAposAlteracaoNoCampoValor() {
    let valor: string = this.getFormValueValores('value');

    if (Util.isEmptyString(valor)) return;

    this.setFormValueValores('value', valor.replace(/[^0-9.,]/g, ''));

    if (valor.includes(',')) {
      this.setFormValueValores('value', valor.replace(',', '.'));
    }
  }

  public realizaTratamentoDeFormularioAposAlteracaoNoCampoStatus() {

    let status: string = this.getFormValueValores('status');

    if (Util.isEmptyString(status)) return;

    switch (status) {
      case 'PENDING':
        this.setFormValueValores('executionDate', null);
        this.formGroupValores.controls['executionDate'].disable();
        break;
      case 'COMPLETED':
        this.setFormValueValores('executionDate', Util.formataDataDoTipoDateParaStringNoPadraoAmericano(new Date()));
        this.formGroupValores.controls['executionDate'].enable();
        break;
      default:
        break;
    }
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
