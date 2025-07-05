import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../../../../../../../config/api-config';
import { CreateCategoryRequest } from '../../../../../../models/request/CreateCategoryRequest';

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

  public cadastraNovaCategoria(categoryRequest: CreateCategoryRequest): Observable<void> {
    return this.http.post<void>(
      `${API_CONFIG.baseUrl}/${API_CONFIG.apiPrefix}/category`,
      categoryRequest,
      this.httpOptions
    )
  }
}
