import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StatusProcessamento } from '../../../../../../../models/StatusProcessamento';
import { FormFieldDetails } from '../../../../../../../shared/custom-form-field/models/FormFieldDetails';
import { DetalhesViewApiService } from '../core/api/detalhes-view-api.service';
import { DetalhesViewFormService } from '../core/form/detalhes-view-form.service';
import { DetalhesViewStateService } from '../core/state/detalhes-view-state.service';

@Injectable({
  providedIn: 'root'
})
export class DetalhesViewAbstractionService {

  constructor(
    private matSnackBar: MatSnackBar,
    private formService: DetalhesViewFormService,
    private stateService: DetalhesViewStateService,
    private apiService: DetalhesViewApiService
  ) { }

  public implementaInicializacaoDeComponente(activatedRoute: ActivatedRoute, ref: ChangeDetectorRef) {
    this.formService.iniciaService();
    this.stateService.iniciaService(ref, this.formService);
    this.implementaObtencaoDeCategorias();
    this.implementaObtencaoDeTransacaoPorId(activatedRoute);
  }

  public implementaDestruicaoDeComponente() {
    this.stateService.destroiService();
    this.formService.destroiService();
  }

  public implementaObtencaoDeCamposDoFormulario(): FormFieldDetails[] {
    return this.stateService.camposFormularioValores;
  }

  public implementaObtencaoDoFormulario(): FormGroup {
    return this.formService.formGroupValores;
  }

  public implementaObtencaoDeStatusDeEnvioDeFormulario(): StatusProcessamento {
    return this.formService.formStatusValores;
  }

  public implementaDirecionamentoDeTratamentoDoCampoCorreto(idCampo: string) {
    switch (idCampo) {
      case ('value'): {
        this.formService.realizaTratamentoDeFormularioAposAlteracaoNoCampoValor();
        break;
      }
      case ('status'): {
        this.formService.realizaTratamentoDeFormularioAposAlteracaoNoCampoStatus();
        break;
      }
      default: break;
    }
  }

  public implementaObtencaoDeVerificacaoSeFormularioEstaValidoParaEnvio(): boolean {

    if (this.formService.verificaSeFormularioEstaValidoParaSerEnviado()) return true;

    return false;
  }

  public implementaObtencaoDeCategorias() {
    this.stateService.enviaRequisicaoDeObtencaoDeCategoriasSubscription =
      this.apiService.seInscreveEmObservableDeObtencaoDeCategorias(
        this.matSnackBar,
        this.stateService,
        this.formService
      );
  }

  public implementaEnvioDoFormulario(activatedRoute: ActivatedRoute) {

    const idTransacao: any = activatedRoute.snapshot.paramMap.get('id');

    if (!idTransacao) {
      this.matSnackBar.open("ID da transação não encontrado", "Fechar", {
        duration: 3500
      });
      return;
    }

    if (this.formService.verificaSeFormularioEstaValidoParaSerEnviado()) {
      this.stateService.geraObjetoRequestAPartirDosDadosDoFormulario(this.formService);
      this.stateService.enviaRequisicaoDeAtualizacaoSubscription =
        this.apiService.seInscreveEmObservableDeAtualizacaoDeTransacao(
          this.matSnackBar,
          idTransacao,
          this.stateService.transacaoRequest,
          this.formService
        );
    }
  }

  public implementaObtencaoDeTransacaoPorId(activatedRoute: ActivatedRoute) {

    const idTransacao: any = activatedRoute.snapshot.paramMap.get('id');

    if (!idTransacao) {
      this.matSnackBar.open("ID da transação não encontrado", "Fechar", {
        duration: 3500
      });
      return;
    }

    this.stateService.enviaRequisicaoDeObtencaoDeTransacaoPorIdSubscription =
      this.apiService.seInscreveEmObservableDeObtencaoDeTransacaoPorId(
        this.matSnackBar,
        idTransacao,
        this.stateService,
        this.formService
      );
  }
}