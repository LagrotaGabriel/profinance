import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageResponse } from '../../../../../../../../models/PageResponse';
import { CategoryResponse } from '../../../../../../models/CategoryResponse';
import { ListagemViewFormService } from '../form/listagem-view-form.service';
import { ListagemViewStateService } from '../state/listagem-view-state.service';
import { ListagemViewHttpService } from './http/listagem-view-http.service';

@Injectable({
  providedIn: 'root'
})
export class ListagemViewApiService {

  constructor(
    private router: Router,
    private matSnackBar: MatSnackBar,
    private httpService: ListagemViewHttpService
  ) { }

  public realizaRequisicaoDeObtencaoDeObjetosPaginados(
    stateService: ListagemViewStateService,
    formService: ListagemViewFormService): Subscription {

    let paginaAtual = stateService.pageResponse != null
      ? stateService.pageResponse.pageNumber
      : 0;

    return this.httpService.obtemCategorias(
      paginaAtual,
      formService.getFormValue('valorPesquisa'),
      formService.getFormValue('tipoPesquisa')
    ).subscribe(
      {
        next: (response: PageResponse<CategoryResponse[]>) => {
          stateService.pageResponse = response;
        },
        error: () => {
          this.matSnackBar.open('Erro ao obter categorias', 'Fechar', { duration: 3000 });
          this.router.navigateByUrl('/painel/listagem');
        },
      }
    );
  }
}
