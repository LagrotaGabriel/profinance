import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../../../../../../../config/api-config';
import { PageResponse } from '../../../../../../../../../models/PageResponse';
import { CategoryResponse } from '../../../../../../../models/CategoryResponse';
import { TransactionRequest } from '../../../../../../../models/TransactionRequest';

@Injectable({
  providedIn: 'root'
})
export class CadastroViewHttpService {

  constructor(
    private http: HttpClient
  ) { }

  private httpOptions = {
    params: new HttpParams({
    }),
  }

  public cadastraNovaTransacao(transactionRequest: TransactionRequest): Observable<void> {
    return this.http.post<void>(`${API_CONFIG.baseUrl}/${API_CONFIG.apiPrefix}/transaction`, transactionRequest, this.httpOptions)
  }

  public obtemCategorias(): Observable<PageResponse<CategoryResponse[]>> {
    return this.http.get<PageResponse<CategoryResponse[]>>(`${API_CONFIG.baseUrl}/${API_CONFIG.apiPrefix}/category?size=300`, this.httpOptions)
  }
}