import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageResponse } from '../../../../../../../../models/PageResponse';
import { TransactionResponse } from '../../../../models/TransactionResponse';

@Injectable({
  providedIn: 'root'
})
export class ListagemViewStateService {

  // TODO inserir statusObtencaoDados com manipulação de loading no apiService

  private _pageResponse: PageResponse<TransactionResponse[]> | undefined;
  private _obtemListagemPaginadaSubscription$: Subscription | undefined;
  private _deletaTransacaoSubscription$: Subscription | undefined;

  public destroiService() {
    this.destroiSubscriptions();
    this.resetaVariaveis();
  }

  private resetaVariaveis() {
    this.pageResponse = undefined;
  }

  private destroiSubscriptions() {
    if (this.obtemListagemPaginadaSubscription != undefined) this.obtemListagemPaginadaSubscription.unsubscribe();
    if (this.deletaTransacaoSubscription != undefined) this.deletaTransacaoSubscription.unsubscribe();
  }

  public obtemConteudoPageResponse(): TransactionResponse[] {
    if (!this._pageResponse || !this._pageResponse.content) return [];
    return this._pageResponse.content;
  }

  public obtemDescricaoStatus(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'Pendente';
      case 'COMPLETED':
        return 'Concluído';
      case 'CANCELED':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  }

  public get pageResponse(): PageResponse<TransactionResponse[]> | undefined {
    return this._pageResponse;
  }

  public set pageResponse(value: PageResponse<TransactionResponse[]> | undefined) {
    this._pageResponse = value;
  }

  public get obtemListagemPaginadaSubscription(): Subscription | undefined {
    return this._obtemListagemPaginadaSubscription$;
  }

  public set obtemListagemPaginadaSubscription(value: Subscription | undefined) {
    this._obtemListagemPaginadaSubscription$ = value;
  }

  public get deletaTransacaoSubscription(): Subscription | undefined {
    return this._deletaTransacaoSubscription$;
  }

  public set deletaTransacaoSubscription(value: Subscription | undefined) {
    this._deletaTransacaoSubscription$ = value;
  }
}
