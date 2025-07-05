import { ChangeDetectorRef, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TITLE_DESCRIPTION } from '../../../../../../../consts/Globals';
import { PageResponse } from '../../../../../../../models/PageResponse';
import { CategoryResponse } from '../../../../../models/CategoryResponse';
import { ListagemViewAbstractionService } from '../../services/abstraction/listagem-view-abstraction.service';

@Component({
  selector: 'listagem-view',
  templateUrl: '../template/listagem-view.component.html',
  styleUrl: '../styles/listagem-view.component.scss'
})
export class ListagemViewComponent {

  constructor(
    private router: Router,
    private titleService: Title,
    private ref: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private abstractionService: ListagemViewAbstractionService
  ) {
    this.abstractionService.implementaInicializacaoDeComponente(this.activatedRoute);
  }

  ngAfterViewInit(): void {
    this.titleService.setTitle(`${TITLE_DESCRIPTION} Categorias`)
    this.abstractionService.implementaInvocacaoDeRequisicaoDeObtencaoDeItensPaginados();
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.abstractionService.implementaDestruicaoDeComponente();
  }

  protected obtemrPageResponse(): PageResponse<CategoryResponse[]> | undefined {
    return this.abstractionService.implementaObtencaoDePageResponse();
  }

  protected obtemConteudo(): CategoryResponse[] {
    return this.abstractionService.implementaObtencaoDeConteudo();
  }

  protected obtemFormularioBusca(): any {
    return this.abstractionService.implementaObtencaoDeFormulario();
  }

  protected obtemDescricaoTipo(tipo: string): string {
    return this.abstractionService.implementaObtencaoDeDescricaoTipo(tipo);
  }

  protected redirecionarParaCategoria(id: string): void {
    this.router.navigate(['/painel/categoria', id]);
    this.ref.detectChanges();
  }
}