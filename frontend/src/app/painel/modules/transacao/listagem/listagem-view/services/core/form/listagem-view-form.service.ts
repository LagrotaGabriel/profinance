import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { StatusProcessamento } from '../../../../../../../../models/StatusProcessamento';
import { Util } from '../../../../../../../../utils/Util';
import { ListagemViewAbstractionService } from '../../abstraction/listagem-view-abstraction.service';

@Injectable({
  providedIn: 'root'
})
export class ListagemViewFormService {

  private _formGroup: FormGroup | undefined;
  private _formStatus: StatusProcessamento = StatusProcessamento.ABERTO;
  private _detectorDeAlteracoesNoFormulario$: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public iniciaService(activatedRoute: ActivatedRoute, abstractionService: ListagemViewAbstractionService) {
    this.formGroup = this.constroiFormulario();
    this.inicializaDetectorDeAlteracoesNoFormulario(activatedRoute, abstractionService);
    this.formStatus = StatusProcessamento.ABERTO;
  }

  public destroiService() {
    this.resetaVariaveis();
    this.realizaUnsubscribeNasSubscriptionsDoService();
  }

  public resetaVariaveis() {
    this.formStatus = StatusProcessamento.ABERTO;

    if (this.formGroup != undefined) this.formGroup.reset();

    this.formGroup = this.constroiFormulario();
  }

  public realizaUnsubscribeNasSubscriptionsDoService() {
    if (this.detectorDeAlteracoesNoFormulario != undefined) this.detectorDeAlteracoesNoFormulario.unsubscribe();
  }

  public constroiFormulario(): FormGroup {
    // TODO VERIFICAR VALIDATORS
    return this.formBuilder.group({
      valorPesquisa: [null,
        [
          Validators.required,
          Validators.maxLength(70)
        ]
      ],
      mesAnoPesquisa: [Util.getMesAnoAtual(),
      [
        Validators.required
      ]
      ],
      tipoPesquisa: ['ALL',
        [
          Validators.required
        ]
      ]
    });
  }

  public inicializaDetectorDeAlteracoesNoFormulario(
    activatedRoute: ActivatedRoute,
    abstractionService: ListagemViewAbstractionService) {

    if (this.formGroup == undefined) return;

    this.formGroup.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(600)
    ).subscribe(values => {
      abstractionService.implementaInvocacaoDeRequisicaoDeObtencaoDeItensPaginados()
    });
  }

  /* Getters e Setters */

  public getFormValue(atributo: string): any {

    if (this.formGroup == undefined) return null;

    if (Util.isEmptyString(this.formGroup.controls[atributo].value))
      return null;
    else {
      return this.formGroup.controls[atributo].value;
    }
  }

  public setFormValue(atributo: string, valor: any) {
    if (this.formGroup == undefined) return;
    this.formGroup.controls[atributo].setValue(valor);
  }

  public isValid(atributoFormulario: string): boolean {
    if (this.formGroup == undefined) return false;
    return this.formGroup.controls[atributoFormulario].valid;
  }

  get formGroup(): FormGroup | undefined {
    return this._formGroup;
  }

  set formGroup(formGroup: FormGroup | undefined) {
    this._formGroup = formGroup;
  }

  get formStatus(): StatusProcessamento {
    return this._formStatus;
  }

  set formStatus(formStatus: StatusProcessamento) {
    this._formStatus = formStatus;
  }

  get detectorDeAlteracoesNoFormulario(): Subscription | undefined {
    return this._detectorDeAlteracoesNoFormulario$;
  }

  set detectorDeAlteracoesNoFormulario(subscription: Subscription) {
    this._detectorDeAlteracoesNoFormulario$ = subscription;
  }
}
