import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../../../../../../../config/api-config';
import { PageResponse } from '../../../../../../../../../models/PageResponse';
import { Util } from '../../../../../../../../../utils/Util';
import { CategoryResponse } from '../../../../../../../models/CategoryResponse';

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

  public obtemCategorias(
    paginaAtual: number,
    valorPesquisa: string,
    tipoPesquisa: any): Observable<PageResponse<CategoryResponse[]>> {

    this.buildRequestParams(
      paginaAtual,
      valorPesquisa,
      tipoPesquisa
    );

    return this.http.get<PageResponse<CategoryResponse[]>>(
      `${API_CONFIG.baseUrl}/${API_CONFIG.apiPrefix}/category`,
      this.httpOptions
    );
  }

  private buildRequestParams(
    pagina: number,
    valorPesquisa: string,
    tipoPesquisa: any) {

    if (Util.isNotObjectEmpty(pagina)) {
      if (Util.isNotObjectEmpty(this.httpOptions.params.get('page')))
        this.httpOptions.params = this.httpOptions.params.set('page', pagina);
      else
        this.httpOptions.params = this.httpOptions.params.append('page', pagina);
    }
    else this.httpOptions.params = this.httpOptions.params.delete('page');

    if (Util.isNotEmptyString(valorPesquisa)) {
      if (Util.isNotObjectEmpty(this.httpOptions.params.get('name')))
        this.httpOptions.params = this.httpOptions.params.set('name', valorPesquisa);
      else
        this.httpOptions.params = this.httpOptions.params.append('name', valorPesquisa);
    }
    else this.httpOptions.params = this.httpOptions.params.delete('name');

    if (Util.isNotEmptyString(tipoPesquisa) && tipoPesquisa !== 'ALL') {
      if (Util.isNotObjectEmpty(this.httpOptions.params.get('type')))
        this.httpOptions.params = this.httpOptions.params.set('type', tipoPesquisa);
      else
        this.httpOptions.params = this.httpOptions.params.append('type', tipoPesquisa);
    }
    else this.httpOptions.params = this.httpOptions.params.delete('type');
  }
}