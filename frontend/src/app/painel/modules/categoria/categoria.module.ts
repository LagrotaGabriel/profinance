import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CadastroModule } from './cadastro/cadastro.module';
import { ListagemModule } from './listagem/listagem.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListagemModule,
    CadastroModule
  ]
})
export class CategoriaModule { }
