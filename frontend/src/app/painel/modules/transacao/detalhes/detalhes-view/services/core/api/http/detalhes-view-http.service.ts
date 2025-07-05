import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../../../../../../../config/api-config';
import { PageResponse } from '../../../../../../../../../models/PageResponse';
import { CategoryResponse } from '../../../../../../../categoria/models/response/CategoryResponse';
import { TransactionRequest } from '../../../../../../../models/TransactionRequest';

@Injectable({
  providedIn: 'root'
})
export class DetalhesViewHttpService {

  constructor(
    private http: HttpClient
  ) { }

  private httpOptions = {
    params: new HttpParams({
    }),
  }

  public atualizaTransacao(id: string, transactionRequest: TransactionRequest): Observable<void> {
    return this.http.put<void>(
      `${API_CONFIG.baseUrl}/${API_CONFIG.apiPrefix}/transaction/${id}`,
      transactionRequest,
      this.httpOptions
    )
  }

  public obtemCategorias(): Observable<PageResponse<CategoryResponse[]>> {
    return this.http.get<PageResponse<CategoryResponse[]>>(`${API_CONFIG.baseUrl}/${API_CONFIG.apiPrefix}/category?size=300`, this.httpOptions)
  }
}