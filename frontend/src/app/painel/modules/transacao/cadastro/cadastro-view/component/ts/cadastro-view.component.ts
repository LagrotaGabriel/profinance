import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TITLE_DESCRIPTION } from '../../../../../../../consts/Globals';
import { StatusProcessamento } from '../../../../../../../models/StatusProcessamento';
import { FormFieldDetails } from '../../../../../../../shared/custom-form-field/models/FormFieldDetails';
import { CadastroViewAbstractionService } from '../../services/abstraction/cadastro-view-abstraction.service';

@Component({
  selector: 'cadastro-view',
  templateUrl: '../template/cadastro-view.component.html',
  styleUrls: ['../styles/cadastro-view.component.scss']
})
export class CadastroViewComponent {

  constructor(
    private titleService: Title,
    private ref: ChangeDetectorRef,
    public abstractionService: CadastroViewAbstractionService
  ) { }

  ngAfterViewInit(): void {
    this.titleService.setTitle(`${TITLE_DESCRIPTION} Nova transação`);
    this.abstractionService.implementaInicializacaoDeComponente(this.ref);
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.abstractionService.implementaDestruicaoDeComponente();
  }

  public obtemFormulario(): FormGroup {
    return this.abstractionService.implementaObtencaoDoFormulario();
  }

  public verificaSeControlEhRequired(formControlName: string): boolean {
    return this.abstractionService.implementaObtencaoDoFormulario().controls[formControlName].hasValidator(Validators.required);
  }

  protected obtemCamposFormulario(): FormFieldDetails[] {
    return this.abstractionService.implementaObtencaoDeCamposDoFormulario();
  }

  protected direcionaParaTratamentoDoCampoCorreto(idCampo: string) {
    this.abstractionService.implementaDirecionamentoDeTratamentoDoCampoCorreto(idCampo);
  }

  protected isFormularioValidoParaEnvio(): boolean {
    return this.abstractionService.implementaObtencaoDeVerificacaoSeFormularioEstaValidoParaEnvio();
  }

  protected implementaObtencaoDeStatusDeEnvioDeFormulario(): StatusProcessamento {
    return this.abstractionService.implementaObtencaoDeStatusDeEnvioDeFormulario();
  }

  protected enviaFormularioCriacao() {
    this.abstractionService.implementaEnvioDoFormulario();
  }
}