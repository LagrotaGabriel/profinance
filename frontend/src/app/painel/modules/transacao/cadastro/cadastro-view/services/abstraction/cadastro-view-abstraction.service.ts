import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusProcessamento } from '../../../../../../../models/StatusProcessamento';
import { FormFieldDetails } from '../../../../../../../shared/custom-form-field/models/FormFieldDetails';
import { CadastroViewApiService } from '../core/Api/cadastro-view-api.service';
import { CadastroViewFormService } from '../core/form/cadastro-view-form.service';
import { CadastroViewStateService } from '../core/state/cadastro-view-state.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroViewAbstractionService {

  constructor(
    private matSnackBar: MatSnackBar,
    private formService: CadastroViewFormService,
    private stateService: CadastroViewStateService,
    private apiService: CadastroViewApiService
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

  public implementaEnvioDoFormulario() {
    if (this.formService.verificaSeFormularioEstaValidoParaSerEnviado()) {
      this.stateService.geraObjetoRequestAPartirDosDadosDoFormulario(this.formService);
      this.stateService.enviaRequisicaoDeCriacaoSubscription =
        this.apiService.seInscreveEmObservableDeCriacaoDeNovaTransacao(
          this.matSnackBar,
          this.stateService.transacaoRequest,
          this.formService
        );
    }
  }
}