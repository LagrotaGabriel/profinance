import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectOptions } from '../../../../../../../../consts/SelectOptions';
import { PageResponse } from '../../../../../../../../models/PageResponse';
import { StatusProcessamento } from '../../../../../../../../models/StatusProcessamento';
import { CategoryResponse } from '../../../../../../categoria/models/response/CategoryResponse';
import { TransactionRequest } from '../../../../../../models/TransactionRequest';
import { TransactionResponse } from '../../../../../listagem/models/TransactionResponse';
import { DetalhesViewFormService } from '../form/detalhes-view-form.service';
import { DetalhesViewStateService } from '../state/detalhes-view-state.service';
import { DetalhesViewHttpService } from './http/detalhes-view-http.service';

@Injectable({
  providedIn: 'root'
})
export class DetalhesViewApiService {

  constructor(
    private router: Router,
    private httpService: DetalhesViewHttpService
  ) { }

  public seInscreveEmObservableDeAtualizacaoDeTransacao(
    matSnackBar: MatSnackBar,
    idTransacao: string,
    transactionRequest: TransactionRequest | null,
    formService: DetalhesViewFormService): Subscription {

    if (transactionRequest == null) {
      matSnackBar.open("Erro ao atualizar transação: Dados inválidos", "Fechar", {
        duration: 3500
      });

      throw new Error("Erro ao atualizar transação: Dados inválidos");
    }

    formService.formStatusValores = StatusProcessamento.PROCESSANDO;
    return this.httpService.atualizaTransacao(idTransacao, transactionRequest).subscribe(
      {
        error: () => {
          formService.formStatusValores = StatusProcessamento.ABERTO;
        },
        complete: () => {
          matSnackBar.open("Transação atualizada com sucesso", "Fechar", {
            duration: 3500
          });
          formService.formStatusValores = StatusProcessamento.ABERTO;
          this.router.navigate(['/painel/transacao/listagem']);
        }
      }
    );
  }

  public seInscreveEmObservableDeObtencaoDeCategorias(
    matSnackBar: MatSnackBar,
    stateService: DetalhesViewStateService,
    formService: DetalhesViewFormService): Subscription {

    return this.httpService.obtemCategorias().subscribe(
      {
        next: (response: PageResponse<CategoryResponse[]>) => {

          if (response.content.length === 0) {
            matSnackBar.open("Nenhuma categoria encontrada. Cadastre uma nova categoria para utilizá-la nas transações.", "Fechar", {
              duration: 3500
            });

            stateService.categoriasEncontradas = [];

            return;
          }

          stateService.categoriasEncontradas = response.content;

          stateService.camposFormularioValores.forEach((campo: any) => {
            if (campo.id === 'categoryId') {
              let selectOption: SelectOptions[] = []
              response.content.forEach(categoriaRetornada => {
                selectOption.push({
                  text: categoriaRetornada.name,
                  value: categoriaRetornada.id
                });
              });

              campo.selectOption = selectOption;
              formService.formGroupValores.controls['categoryId'].setValue(response.content[0].id);
            }
          });
        },
        error: () => {
          matSnackBar.open("Erro ao obter categorias", "Fechar", {
            duration: 3500
          });

          stateService.categoriasEncontradas = [];
        }
      }
    );
  }

  public seInscreveEmObservableDeObtencaoDeTransacaoPorId(
    matSnackBar: MatSnackBar,
    idTransacao: string,
    stateService: DetalhesViewStateService,
    formService: DetalhesViewFormService): Subscription {

    formService.formStatusValores = StatusProcessamento.PROCESSANDO;

    return this.httpService.obtemTransacaoPorId(idTransacao).subscribe(
      {
        next: (response: TransactionResponse) => {
          formService.formGroupValores.patchValue(response);
          stateService.transacaoEncontrada = response;
        },
        complete: () => {
          formService.formStatusValores = StatusProcessamento.ABERTO;
        },
        error: () => {
          matSnackBar.open("Erro ao obter transação", "Fechar", {
            duration: 3500
          });

          formService.formStatusValores = StatusProcessamento.ABERTO;
          this.router.navigate(['/painel/transacao/listagem']);
        }
      }
    );
  }
}