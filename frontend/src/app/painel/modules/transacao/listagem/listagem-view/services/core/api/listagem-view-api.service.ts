import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageResponse } from '../../../../../../../../models/PageResponse';
import { TransactionResponse } from '../../../../models/TransactionResponse';
import { ListagemViewFormService } from '../form/listagem-view-form.service';
import { ListagemViewStateService } from '../state/listagem-view-state.service';
import { ListagemViewHttpService } from './http/listagem-view-http.service';

@Injectable({
  providedIn: 'root'
})
export class ListagemViewApiService {

  constructor(
    private router: Router,
    private httpService: ListagemViewHttpService
  ) { }

  public realizaRequisicaoDeObtencaoDeObjetosPaginados(
    stateService: ListagemViewStateService,
    formService: ListagemViewFormService): Subscription {

    let paginaAtual = stateService.pageResponse != null
      ? stateService.pageResponse.pageNumber
      : 0;

    return this.httpService.getClientes(
      paginaAtual,
      formService.getFormValue('valorPesquisa'),
      formService.getFormValue('mesAnoPesquisa'),
      formService.getFormValue('tipoPesquisa')
    ).subscribe(
      {
        next: (response: PageResponse<TransactionResponse[]>) => {
          stateService.pageResponse = response;
        },
        error: () => {
          this.router.navigateByUrl('/painel/listagem');
        },
      }
    );
  }
}
