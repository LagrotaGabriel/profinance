import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { STATUS_CRIACAO_TRANSACAO } from '../../../../../../../../consts/SelectOptions';
import { FormFieldDetails } from '../../../../../../../../shared/custom-form-field/models/FormFieldDetails';
import { CategoryResponse } from '../../../models/CategoryResponse';
import { TransactionRequest } from '../../../models/TransactionRequest';
import { CadastroViewFormService } from '../form/cadastro-view-form.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroViewStateService {

  private _enviaRequisicaoDeCriacaoSubscription$: Subscription | undefined;
  private _enviaRequisicaoDeObtencaoDeCategoriasSubscription$: Subscription | undefined;

  private _camposFormularioValores!: FormFieldDetails[];

  private _transacaoRequest: TransactionRequest | null = null;

  private _categoriasEncontradas: CategoryResponse[] = [];

  public iniciaService(ref: ChangeDetectorRef, formService: CadastroViewFormService) {
    this.geraCamposDoFormularioValores(ref, formService);
  }

  public destroiService(): void {
    this.destroiSubscriptions();
    this.resetaVariaveis();
  }

  private destroiSubscriptions() {
    if (this.enviaRequisicaoDeCriacaoSubscription != undefined) this.enviaRequisicaoDeCriacaoSubscription.unsubscribe();
    if (this.enviaRequisicaoDeObtencaoDeCategoriasSubscription != undefined) this.enviaRequisicaoDeObtencaoDeCategoriasSubscription.unsubscribe();
  }

  private resetaVariaveis() {
    this.camposFormularioValores = [];
    this.transacaoRequest = null;
    this.categoriasEncontradas = [];
  }

  public geraCamposDoFormularioValores(ref: ChangeDetectorRef, formService: CadastroViewFormService) {

    this._camposFormularioValores =
      [
        {
          id: 'description',
          bootstrapColClass: 'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12',
          maxLength: '60',
          index: null,
          icone: 'abc',
          type: 'text',
          label: 'Descrição',
          hint: 'Descrição da transação',
          placeHolder: 'Digite aqui...',
          selectOption: null,
          formControlName: 'description',
          control: formService.formGroupValores.controls['description']
        },
        {
          id: 'value',
          bootstrapColClass: 'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12',
          maxLength: '10',
          index: null,
          icone: 'attach_money',
          type: 'text',
          label: 'Valor',
          hint: 'Valor da transação',
          placeHolder: 'Digite aqui...',
          selectOption: null,
          formControlName: 'value',
          control: formService.formGroupValores.controls['value']
        },
        {
          id: 'expirationDate',
          bootstrapColClass: 'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12',
          maxLength: null,
          index: null,
          icone: 'calendar_today',
          type: 'date',
          label: 'Data de vencimento',
          hint: 'Data de vencimento da transação',
          placeHolder: 'Digite aqui...',
          selectOption: null,
          formControlName: 'expirationDate',
          control: formService.formGroupValores.controls['expirationDate']
        },
        {
          id: 'executionDate',
          bootstrapColClass: 'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12',
          maxLength: null,
          index: null,
          icone: 'event_available',
          type: 'date',
          label: 'Data de pagamento',
          hint: 'Data de pagamento da transação',
          placeHolder: 'Digite aqui...',
          selectOption: null,
          formControlName: 'executionDate',
          control: formService.formGroupValores.controls['executionDate']
        },
        {
          id: 'status',
          bootstrapColClass: 'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12',
          maxLength: '30',
          index: null,
          icone: 'edit',
          type: 'select',
          label: 'Status',
          hint: 'Status da transação',
          placeHolder: 'Digite aqui...',
          selectOption: STATUS_CRIACAO_TRANSACAO,
          formControlName: 'status',
          control: formService.formGroupValores.controls['status']
        },
        {
          id: 'categoryId',
          bootstrapColClass: 'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12',
          maxLength: '60',
          index: null,
          icone: 'edit',
          type: 'select',
          label: 'Categoria',
          hint: 'Categoria da transação',
          placeHolder: 'Digite aqui...',
          selectOption: [],
          formControlName: 'categoryId',
          control: formService.formGroupValores.controls['categoryId']
        }
      ]

    ref.detectChanges();
  }

  public geraObjetoRequestAPartirDosDadosDoFormulario(formService: CadastroViewFormService) {

    let request: TransactionRequest = {
      description: formService.getFormValueValores('description'),
      value: formService.getFormValueValores('value'),
      expirationDate: formService.getFormValueValores('expirationDate'),
      executionDate: formService.getFormValueValores('executionDate'),
      status: formService.getFormValueValores('status'),
      categoryId: formService.getFormValueValores('categoryId')
    };

    this.transacaoRequest = request;
  }

  // ========================== GETTERS E SETTERS ========================== //

  get camposFormularioValores(): FormFieldDetails[] {
    return this._camposFormularioValores;
  }

  set camposFormularioValores(formFieldDetails: FormFieldDetails[]) {
    this._camposFormularioValores = formFieldDetails;
  }

  get enviaRequisicaoDeCriacaoSubscription(): Subscription | undefined {
    return this._enviaRequisicaoDeCriacaoSubscription$;
  }

  set enviaRequisicaoDeCriacaoSubscription(subscription: Subscription | undefined) {
    this._enviaRequisicaoDeCriacaoSubscription$ = subscription;
  }

  get enviaRequisicaoDeObtencaoDeCategoriasSubscription(): Subscription | undefined {
    return this._enviaRequisicaoDeObtencaoDeCategoriasSubscription$;
  }

  set enviaRequisicaoDeObtencaoDeCategoriasSubscription(subscription: Subscription | undefined) {
    this._enviaRequisicaoDeObtencaoDeCategoriasSubscription$ = subscription;
  }

  get transacaoRequest(): TransactionRequest | null {
    return this._transacaoRequest;
  }

  set transacaoRequest(transacaoRequest: TransactionRequest | null) {
    this._transacaoRequest = transacaoRequest;
  }

  get categoriasEncontradas(): CategoryResponse[] {
    return this._categoriasEncontradas;
  }

  set categoriasEncontradas(categoriasEncontradas: CategoryResponse[]) {
    this._categoriasEncontradas = categoriasEncontradas;
  }
}