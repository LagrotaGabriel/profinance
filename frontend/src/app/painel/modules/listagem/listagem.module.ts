import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListagemViewComponent } from './listagem-view/component/ts/listagem-view.component';
import { ListagemRoutingModule } from './listagem.routes';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ListagemViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ListagemRoutingModule,
    MatIconModule, 
    HttpClientModule
  ]
})
export class ListagemModule { }