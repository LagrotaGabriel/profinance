import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageResponse } from '../../../../../../models/PageResponse';
import { TransactionResponse } from '../../../models/TransactionResponse';
import { ListagemViewApiService } from '../core/api/listagem-view-api.service';
import { ListagemViewFormService } from '../core/form/listagem-view-form.service';
import { ListagemViewStateService } from '../core/state/listagem-view-state.service';

@Injectable({
  providedIn: 'root'
})
export class ListagemViewAbstractionService {

  constructor(
    private formService: ListagemViewFormService,
    private stateService: ListagemViewStateService,
    private apiService: ListagemViewApiService
  ) { }

  public implementaInicializacaoDeComponente(activatedRoute: ActivatedRoute) {
    this.formService.iniciaService(activatedRoute, this);
  }

  public implementaDestruicaoDeComponente() {
    this.stateService.destroiService();
  }

  public implementaInvocacaoDeRequisicaoDeObtencaoDeItensPaginados() {
    this.stateService.obtemListagemPaginadaSubscription =
      this.apiService.realizaRequisicaoDeObtencaoDeObjetosPaginados(
        this.stateService,
        this.formService
      );
  }

  public implementaObtencaoDeConteudo(): TransactionResponse[] {
    return this.stateService.obtemConteudoPageResponse();
  }

  public implementaObtencaoDePageResponse(): PageResponse<TransactionResponse[]> | undefined {
    return this.stateService.pageResponse;
  }

  public implementaObtencaoDeFormulario(): FormGroup | undefined {
    return this.formService.formGroup;
  }
}
