import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageResponse } from '../../../../../../../../models/PageResponse';
import { CategoryResponse } from '../../../../../../models/CategoryResponse';

@Injectable({
  providedIn: 'root'
})
export class ListagemViewStateService {

  // TODO inserir statusObtencaoDados com manipulação de loading no apiService

  private _pageResponse: PageResponse<CategoryResponse[]> | undefined;
  private _obtemListagemPaginadaSubscription$: Subscription | undefined;

  public destroiService() {
    this.destroiSubscriptions();
    this.resetaVariaveis();
  }

  private resetaVariaveis() {
    this.pageResponse = undefined;
  }

  private destroiSubscriptions() {
    if (this.obtemListagemPaginadaSubscription != undefined) this.obtemListagemPaginadaSubscription.unsubscribe();
  }

  public obtemConteudoPageResponse(): CategoryResponse[] {
    if (!this._pageResponse || !this._pageResponse.content) return [];
    return this._pageResponse.content;
  }

  public obtemDescricaoTipo(tipo: string): string {
    switch (tipo) {
      case 'INPUT':
        return 'Entrada';
      case 'OUTPUT':
        return 'Saída';
      default:
        return 'Desconhecido';
    }
  }

  public get pageResponse(): PageResponse<CategoryResponse[]> | undefined {
    return this._pageResponse;
  }

  public set pageResponse(value: PageResponse<CategoryResponse[]> | undefined) {
    this._pageResponse = value;
  }

  public get obtemListagemPaginadaSubscription(): Subscription | undefined {
    return this._obtemListagemPaginadaSubscription$;
  }

  public set obtemListagemPaginadaSubscription(value: Subscription | undefined) {
    this._obtemListagemPaginadaSubscription$ = value;
  }
}