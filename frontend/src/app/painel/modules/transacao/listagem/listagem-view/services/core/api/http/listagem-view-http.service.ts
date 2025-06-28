import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../../../../../../../config/api-config';
import { PageResponse } from '../../../../../../../../../models/PageResponse';
import { Util } from '../../../../../../../../../utils/Util';
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
      `${API_CONFIG.baseUrl}/${API_CONFIG.apiPrefix}/transaction`,
      this.httpOptions
    );
  }

  private buildRequestParams(
    pagina: number,
    valorPesquisa: string,
    mesAnoPesquisa: any,
    tipoPesquisa: any) {

    if (Util.isNotObjectEmpty(pagina)) {
      if (Util.isNotObjectEmpty(this.httpOptions.params.get('page')))
        this.httpOptions.params = this.httpOptions.params.set('page', pagina);
      else
        this.httpOptions.params = this.httpOptions.params.append('page', pagina);
    }
    else this.httpOptions.params = this.httpOptions.params.delete('page');

    if (Util.isNotEmptyString(valorPesquisa)) {
      if (Util.isNotObjectEmpty(this.httpOptions.params.get('description')))
        this.httpOptions.params = this.httpOptions.params.set('description', valorPesquisa);
      else
        this.httpOptions.params = this.httpOptions.params.append('description', valorPesquisa);
    }
    else this.httpOptions.params = this.httpOptions.params.delete('description');

    if (Util.isNotEmptyString(mesAnoPesquisa)) {

      let mesAnoSplitted: string[] = mesAnoPesquisa.split('-');
      let mes = mesAnoSplitted[1];
      let ano = mesAnoSplitted[0];

      if (Util.isNotObjectEmpty(this.httpOptions.params.get('month')) || Util.isNotObjectEmpty(this.httpOptions.params.get('year'))) {
        this.httpOptions.params = this.httpOptions.params.set('month', mes);
        this.httpOptions.params = this.httpOptions.params.set('year', ano);
      }
      else {
        this.httpOptions.params = this.httpOptions.params.append('month', mes);
        this.httpOptions.params = this.httpOptions.params.append('year', ano);
      }
    }
    else {
      this.httpOptions.params = this.httpOptions.params.delete('month');
      this.httpOptions.params = this.httpOptions.params.delete('year');
    }

    if (Util.isNotEmptyString(tipoPesquisa) && tipoPesquisa !== 'ALL') {
      if (Util.isNotObjectEmpty(this.httpOptions.params.get('type')))
        this.httpOptions.params = this.httpOptions.params.set('type', tipoPesquisa);
      else
        this.httpOptions.params = this.httpOptions.params.append('type', tipoPesquisa);
    }
    else this.httpOptions.params = this.httpOptions.params.delete('type');
  }

}
