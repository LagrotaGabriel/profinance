import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatusProcessamento } from '../../../../../../../../models/StatusProcessamento';
import { CreateCategoryRequest } from '../../../../../models/request/CreateCategoryRequest';
import { CadastroViewFormService } from '../form/cadastro-view-form.service';
import { CadastroViewHttpService } from './http/cadastro-view-http.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroViewApiService {

  constructor(
    private router: Router,
    private httpService: CadastroViewHttpService
  ) { }

  public seInscreveEmObservableDeCriacaoDeNovaCategoria(
    matSnackBar: MatSnackBar,
    categoryRequest: CreateCategoryRequest | null,
    formService: CadastroViewFormService): Subscription {

    if (categoryRequest == null) {
      matSnackBar.open("Erro ao cadastrar categoria: Dados inválidos", "Fechar", {
        duration: 3500
      });

      throw new Error("Erro ao cadastrar transação: Dados inválidos");
    }

    formService.formStatusValores = StatusProcessamento.PROCESSANDO;
    return this.httpService.cadastraNovaCategoria(categoryRequest).subscribe(
      {
        error: () => {
          formService.formStatusValores = StatusProcessamento.ABERTO;
        },
        complete: () => {
          matSnackBar.open("Categoria cadastrada com sucesso", "Fechar", {
            duration: 3500
          });
          formService.formStatusValores = StatusProcessamento.ABERTO;
          this.router.navigate(['/painel/categoria/listagem']);
        }
      }
    );
  }
}
