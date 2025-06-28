import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../../../../../../../config/api-config';
import { PageResponse } from '../../../../../../../../../models/PageResponse';
import { TransactionResponse } from '../../../../../models/TransactionResponse';

@Injectable({
  providedIn: 'root'
})
export class ListagemViewHttpService {

  constructor(
    private http: HttpClient
  ) { }

  private httpOptions = {
    params: new HttpParams({
    }),
  }

  public getClientes(
    paginaAtual: number,
    valorPesquisa: string,
    mesAnoPesquisa: any,
    tipoPesquisa: any): Observable<PageResponse<TransactionResponse[]>> {

    this.buildRequestParams(
      paginaAtual,
      valorPesquisa,
      mesAnoPesquisa,
      tipoPesquisa
    );

    return this.http.get<PageResponse<TransactionResponse[]>>(
      // TODO CORRIGIR PARAMS
      `${API_CONFIG.baseUrl}/${API_CONFIG.apiPrefix}/transaction?month=6&year=2025`,
      this.httpOptions
    );
  }

  private buildRequestParams(
    pagina: number,
    valorPesquisa: string,
    mesAnoPesquisa: any,
    tipoPesquisa: any) {

    // TODO CONSTRUIR PARAMETROS DE REQUISIÇÃO
  }

}
