import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { TIPO_CATEGORIA } from '../../../../../../../../consts/SelectOptions';
import { FormFieldDetails } from '../../../../../../../../shared/custom-form-field/models/FormFieldDetails';
import { CreateCategoryRequest } from '../../../../../models/request/CreateCategoryRequest';
import { CadastroViewFormService } from '../form/cadastro-view-form.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroViewStateService {

  private _enviaRequisicaoDeCriacaoSubscription$: Subscription | undefined;
  private _enviaRequisicaoDeObtencaoDeCategoriasSubscription$: Subscription | undefined;

  private _camposFormularioValores!: FormFieldDetails[];

  private _categoryRequest: CreateCategoryRequest | null = null;

  public iniciaService(ref: ChangeDetectorRef, formService: CadastroViewFormService) {
    this.geraCamposDoFormularioValores(ref, formService);
  }

  public destroiService(): void {
    this.destroiSubscriptions();
    this.resetaVariaveis();
  }

  private destroiSubscriptions() {
    if (this.enviaRequisicaoDeCriacaoSubscription != undefined) this.enviaRequisicaoDeCriacaoSubscription.unsubscribe();
  }

  private resetaVariaveis() {
    this.camposFormularioValores = [];
    this.createCategoryRequest = null;
  }

  public geraCamposDoFormularioValores(ref: ChangeDetectorRef, formService: CadastroViewFormService) {

    this._camposFormularioValores =
      [
        {
          id: 'name',
          bootstrapColClass: 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12',
          maxLength: '60',
          index: null,
          icone: 'abc',
          type: 'text',
          label: 'Descrição',
          hint: 'Descrição da categoria',
          placeHolder: 'Digite aqui...',
          selectOption: null,
          formControlName: 'name',
          control: formService.formGroupValores.controls['name']
        },
        {
          id: 'type',
          bootstrapColClass: 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12',
          maxLength: '30',
          index: null,
          icone: 'edit',
          type: 'select',
          label: 'Tipo',
          hint: 'Tipo da categoria',
          placeHolder: 'Digite aqui...',
          selectOption: TIPO_CATEGORIA,
          formControlName: 'type',
          control: formService.formGroupValores.controls['type']
        }
      ]

    ref.detectChanges();
  }

  public geraObjetoRequestAPartirDosDadosDoFormulario(formService: CadastroViewFormService) {

    let request: CreateCategoryRequest = {
      name: formService.getFormValueValores('name'),
      type: formService.getFormValueValores('type'),
    };

    this.createCategoryRequest = request;
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

  get createCategoryRequest(): CreateCategoryRequest | null {
    return this._categoryRequest;
  }

  set createCategoryRequest(createCategoryRequest: CreateCategoryRequest | null) {
    this._categoryRequest = createCategoryRequest;
  }
}
