import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CadastroModule } from './cadastro/cadastro.module';
import { DetalhesModule } from './detalhes/detalhes.module';
import { ListagemModule } from './listagem/listagem.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListagemModule,
    CadastroModule,
    DetalhesModule
  ]
})
export class TransacaoModule { }
