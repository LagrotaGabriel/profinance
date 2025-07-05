import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TITLE_DESCRIPTION } from '../../../../../../../consts/Globals';
import { StatusProcessamento } from '../../../../../../../models/StatusProcessamento';
import { FormFieldDetails } from '../../../../../../../shared/custom-form-field/models/FormFieldDetails';
import { DetalhesViewAbstractionService } from '../../services/abstraction/detalhes-view-abstraction.service';

@Component({
  selector: 'detalhes-view',
  templateUrl: '../template/detalhes-view.component.html',
  styleUrl: '../styles/detalhes-view.component.scss'
})
export class DetalhesViewComponent {

  constructor(
    private titleService: Title,
    private ref: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public abstractionService: DetalhesViewAbstractionService
  ) { }

  ngAfterViewInit(): void {
    this.titleService.setTitle(`${TITLE_DESCRIPTION} Detalhes da transação`);
    this.abstractionService.implementaInicializacaoDeComponente(this.activatedRoute, this.ref);
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
    this.abstractionService.implementaEnvioDoFormulario(this.activatedRoute);
  }
}