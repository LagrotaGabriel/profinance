import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  public implementaInicializacaoDeComponente(ref: ChangeDetectorRef) {
    this.formService.iniciaService();
    this.stateService.iniciaService(ref, this.formService);
    this.implementaObtencaoDeCategorias();
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

  public implementaEnvioDoFormulario() {
    if (this.formService.verificaSeFormularioEstaValidoParaSerEnviado()) {
      // this.stateService.geraObjetoRequestAPartirDosDadosDoFormulario(this.formService);
      // this.stateService.enviaRequisicaoDeAtualizacaoSubscription =
      //   this.apiService.seInscreveEmObservableDeAtualizacaoDeTransacao(
      //     this.matSnackBar,
      //     // TODO OBTENCAO DO ID DA TRANSAÇÃO
      //     this.stateService.transacaoRequest,
      //     this.formService
      //   );
    }
  }
}