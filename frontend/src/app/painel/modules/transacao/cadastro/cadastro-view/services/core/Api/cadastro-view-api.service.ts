import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectOptions } from '../../../../../../../../consts/SelectOptions';
import { PageResponse } from '../../../../../../../../models/PageResponse';
import { StatusProcessamento } from '../../../../../../../../models/StatusProcessamento';
import { CategoryResponse } from '../../../../../../models/CategoryResponse';
import { TransactionRequest } from '../../../../../../models/TransactionRequest';
import { CadastroViewFormService } from '../form/cadastro-view-form.service';
import { CadastroViewStateService } from '../state/cadastro-view-state.service';
import { CadastroViewHttpService } from './http/cadastro-view-http.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroViewApiService {

  constructor(
    private router: Router,
    private httpService: CadastroViewHttpService
  ) { }

  public seInscreveEmObservableDeCriacaoDeNovaTransacao(
    matSnackBar: MatSnackBar,
    transactionRequest: TransactionRequest | null,
    formService: CadastroViewFormService): Subscription {

    if (transactionRequest == null) {
      matSnackBar.open("Erro ao cadastrar transação: Dados inválidos", "Fechar", {
        duration: 3500
      });

      throw new Error("Erro ao cadastrar transação: Dados inválidos");
    }

    formService.formStatusValores = StatusProcessamento.PROCESSANDO;
    return this.httpService.cadastraNovaTransacao(transactionRequest).subscribe(
      {
        error: () => {
          formService.formStatusValores = StatusProcessamento.ABERTO;
        },
        complete: () => {
          matSnackBar.open("Transação cadastrada com sucesso", "Fechar", {
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
    stateService: CadastroViewStateService,
    formService: CadastroViewFormService): Subscription {

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
}
