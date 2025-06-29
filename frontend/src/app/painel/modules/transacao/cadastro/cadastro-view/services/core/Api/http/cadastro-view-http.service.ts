import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../../../../../../../config/api-config';
import { TransactionRequest } from '../../../../models/TransactionRequest';

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
}
