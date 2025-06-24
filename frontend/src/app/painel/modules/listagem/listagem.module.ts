import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListagemViewComponent } from './listagem-view/ts/listagem-view.component';
import { ListagemRoutingModule } from './listagem.routes';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ListagemViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ListagemRoutingModule,
    MatIconModule
  ]
})
export class ListagemModule { }