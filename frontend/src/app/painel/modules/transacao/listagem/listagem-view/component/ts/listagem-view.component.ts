import { ChangeDetectorRef, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TITLE_DESCRIPTION } from '../../../../../../../consts/Globals';
import { PageResponse } from '../../../../../../../models/PageResponse';
import { TransactionResponse } from '../../../models/TransactionResponse';
import { ListagemViewAbstractionService } from '../../services/abstraction/listagem-view-abstraction.service';

@Component({
  selector: 'listagem-view',
  templateUrl: '../template/listagem-view.component.html',
  styleUrl: '../styles/listagem-view.component.scss'
})
export class ListagemViewComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private abstractionService: ListagemViewAbstractionService,
    private ref: ChangeDetectorRef
  ) {
    this.abstractionService.implementaInicializacaoDeComponente(this.activatedRoute);
  }

  ngAfterViewInit(): void {
    this.titleService.setTitle(`${TITLE_DESCRIPTION} Transações`)
    this.abstractionService.implementaInvocacaoDeRequisicaoDeObtencaoDeItensPaginados();
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.abstractionService.implementaDestruicaoDeComponente();
  }

  protected obtemrPageResponse(): PageResponse<TransactionResponse[]> | undefined {
    return this.abstractionService.implementaObtencaoDePageResponse();
  }

  protected obtemConteudo(): TransactionResponse[] {
    return this.abstractionService.implementaObtencaoDeConteudo();
  }

  protected obtemFormularioBusca(): any {
    return this.abstractionService.implementaObtencaoDeFormulario();
  }

  protected obtemDescricaoStatus(status: string): string {
    return this.abstractionService.implementaObtencaoDeDescricaoStatus(status);
  }
}
