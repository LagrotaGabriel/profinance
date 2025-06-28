import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ListagemViewComponent } from './listagem-view/component/ts/listagem-view.component';
import { ListagemRoutingModule } from './listagem.routes';

@NgModule({
  declarations: [
    ListagemViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ListagemRoutingModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListagemModule { }